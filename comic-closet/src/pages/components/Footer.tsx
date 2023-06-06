import Image from 'next/image';
import FooterLink from './FooterLink';
import Copyright from './Copyright';

export default function Footer() {
    return(
        <>
            <Image
            src='/logo.svg'
            alt='Logo'
            height={106}
            width={106}
            />

            <div>
                <FooterLink url={'https://www.simpleviewinc.com'} text={'Privacy Policy'}/>
                <span> | </span>
                <FooterLink url={'https://www.simpleviewinc.com'} text={'Terms of Service'}/>
            </div>

            <Copyright />
        </>
    )
}