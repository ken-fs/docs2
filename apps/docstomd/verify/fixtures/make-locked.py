#!/usr/bin/env python3
"""
造两个「打不开」的样本，用来验方案 §17 的「扫描 PDF 和加密文件有明确提示」。

  locked.pdf   带 /Encrypt 字典的 PDF。pdf.js 见到它会抛 PasswordException，
               我们要把那个异常翻成一句人能看懂的话，而不是「转换失败」。
  locked.xlsx  加了密码的 .xlsx 其实不是 zip，而是一个 OLE 容器（真正的表格
               被加密后塞在里面）。所以只要文件头是 OLE 就够触发那条分支 ——
               这也正好和老的 .xls 是同一条路。

手写而不是用 pikepdf/qpdf：这机器上两个都没有，而这里要的只是「能触发那条
错误分支」的最小文件，不需要真的能被密码解开。
"""
import os
import struct
import zlib

HERE = os.path.dirname(os.path.abspath(__file__))

# ---------------------------------------------------------------- locked.pdf
#
# RC4 40 位（/V 1 /R 2）是最老的那套加密，字段最少。pdf.js 不需要密码正确
# 才抛 PasswordException —— 它在拿不到空密码就能解的时候就抛了，而随手填的
# /O /U 值几乎不可能刚好对上空密码。
#
# 每个对象的字节偏移要在写的时候记下来，xref 表里的数字必须精确到字节，
# 差一个字节 pdf.js 就报结构损坏（那会走到另一条错误分支上去）。

objects = [
    # 1: 目录
    b"<< /Type /Catalog /Pages 2 0 R >>",
    # 2: 页树
    b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    # 3: 一页
    b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] "
    b"/Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
    # 4: 页面内容。加密文件里这段本该是密文，但 pdf.js 在解密之前就拦下了，
    #    所以明文放着不影响这个样本要测的东西。
    b"<< /Length 44 >>\nstream\nBT /F1 24 Tf 72 700 Td (Locked) Tj ET\nendstream",
    # 5: 字体
    b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    # 6: 加密字典。/O 和 /U 是 32 字节的口令校验值，这里填固定字节。
    b"<< /Filter /Standard /V 1 /R 2 /P -1 "
    b"/O <" + b"41" * 32 + b"> /U <" + b"42" * 32 + b"> >>",
]

buf = bytearray(b"%PDF-1.4\n")
offsets = []
for i, body in enumerate(objects, start=1):
    offsets.append(len(buf))
    buf += b"%d 0 obj\n" % i + body + b"\nendobj\n"

xref_at = len(buf)
buf += b"xref\n0 %d\n" % (len(objects) + 1)
buf += b"0000000000 65535 f \n"
for off in offsets:
    buf += b"%010d 00000 n \n" % off

# /ID 是加密的必需项 —— 它参与口令校验的算法，缺了 pdf.js 会先报结构错
buf += (
    b"trailer\n<< /Size %d /Root 1 0 R /Encrypt 6 0 R "
    b"/ID [<" + b"31" * 16 + b"> <" + b"31" * 16 + b">] >>\n"
    b"startxref\n%d\n%%%%EOF\n"
) % (len(objects) + 1, xref_at)

with open(os.path.join(HERE, "locked.pdf"), "wb") as f:
    f.write(buf)
print("locked.pdf", len(buf), "bytes")

# --------------------------------------------------------------- locked.xlsx
#
# 一个最小的 OLE/CFB 容器。真实的加密 xlsx 里装着 EncryptedPackage 流，
# 但我们的代码只嗅文件头（sniff 认 D0 CF 11 E0 就判 ole），到不了流那一层。
# 所以这里造一个结构上说得通的空容器就够，不必伪造整份加密结构。

SECTOR = 512
header = bytearray(b"\x00" * SECTOR)
header[0:8] = b"\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1"  # CFB 魔数
struct.pack_into("<H", header, 0x18, 0x003E)       # minor version
struct.pack_into("<H", header, 0x1A, 0x0003)       # major version 3
struct.pack_into("<H", header, 0x1C, 0xFFFE)       # 小端标记
struct.pack_into("<H", header, 0x1E, 9)            # 扇区大小 2^9 = 512
struct.pack_into("<H", header, 0x20, 6)            # 迷你扇区 2^6 = 64
struct.pack_into("<I", header, 0x2C, 1)            # FAT 扇区数
struct.pack_into("<i", header, 0x30, 1)            # 目录起始扇区
struct.pack_into("<i", header, 0x3C, -2)           # 无 DIFAT
for i in range(109):                                # DIFAT：第 0 个指向 FAT
    struct.pack_into("<i", header, 0x4C + i * 4, 0 if i == 0 else -1)

fat = bytearray(b"\xff" * SECTOR)                  # 全部 FREESECT
struct.pack_into("<i", fat, 0, -3)                 # 扇区 0 = FAT 自己
struct.pack_into("<i", fat, 4, -2)                 # 扇区 1 = 目录，链尾

directory = bytearray(b"\x00" * SECTOR)
name = "Root Entry".encode("utf-16-le")
directory[0 : len(name)] = name
struct.pack_into("<H", directory, 0x40, len(name) + 2)  # 名字长度含结尾的 \0\0
directory[0x42] = 5                                     # 类型：根
directory[0x43] = 1                                     # 颜色：黑
struct.pack_into("<i", directory, 0x44, -1)             # 左兄弟
struct.pack_into("<i", directory, 0x48, -1)             # 右兄弟
struct.pack_into("<i", directory, 0x4C, -1)             # 子节点
struct.pack_into("<i", directory, 0x74, -2)             # 迷你流起始
for slot in range(1, 4):                                # 其余目录项标为未用
    directory[slot * 128 + 0x42] = 0
    for off in (0x44, 0x48, 0x4C):
        struct.pack_into("<i", directory, slot * 128 + off, -1)

with open(os.path.join(HERE, "locked.xlsx"), "wb") as f:
    f.write(header + fat + directory)
print("locked.xlsx", SECTOR * 3, "bytes")
