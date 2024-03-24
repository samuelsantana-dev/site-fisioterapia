/* eslint-disable no-dupe-keys */
const createLink = (href: string) => ({
    className:'links',
    target: 'blank',
    rel: "noreferrer",
    href
})

export const instagram = createLink("#")
export const tiktok = createLink("#")
export const whatsapp = createLink("#")
export const techWorld = createLink("#")
