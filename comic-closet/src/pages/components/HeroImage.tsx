import Image from 'next/image'

export default function HeroImage() {
    return (
        <>
            <Image 
                src='/hero-photo.png'
                alt='Amir and his comics'
                height={375}
                width={450}
            />
            <div>
                <h1>Comic Closet</h1>
            </div>
        </>
    )
}