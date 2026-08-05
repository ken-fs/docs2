/**
 * 站点级的常量。六份字典都要引用它们，写在一处才改得动 —— 邮箱散在六个
 * 语种文件里，换一次地址就得改六遍，漏一个就是一页留着死信箱。
 */

/** 联系邮箱。域名是我们自己的，收信在域名商那边做转发即可。 */
export const CONTACT_EMAIL = "hello@docs2html.com";

/** 条款和隐私政策的生效日期，也是 LegalShell 上显示的那个。 */
export const EFFECTIVE_DATE = "2026-08-04";

/**
 * 姐妹站。两站是同一个人做的同一套东西，方向相反：这边把文档转成 HTML，
 * 那边转成 Markdown。互相指一下对用户有用（找错门的人一次就能走到对的那边），对
 * 两个域名的权重也有好处。
 *
 * 用绝对地址：跨域名，没有相对写法。rel 不加 nofollow —— 这是我们自己的站，
 * 明确要传递权重。
 */
export const SIBLING_SITE = "https://docstomd.com/";
