import Image from 'next/image';
import { FaBolt } from 'react-icons/fa'
import { FaBars } from 'react-icons/fa'

export default function Header() {
    return (
        <>
            <Image 
                src='./logo.svg'
                alt='logo'
                height={75}
                width={75}
            />

            <div>
                <FaBolt />
                <span>(0)</span>
                <button>
                    <FaBars />
                </button>
            </div>
        </>
    )
}