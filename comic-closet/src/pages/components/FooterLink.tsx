



type FooterLinkType = {
    url: string,
    text: string
}

export default function FooterLink({url, text}: FooterLinkType){
    return (
        <a href={url} target='_blank'>{text}</a>
    )
}