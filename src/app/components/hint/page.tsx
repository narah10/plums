import Image from 'next/image';
import Link from 'next/link';

export default function HintIcon(){
    return(
        <div className="max-w-[230px] ">
            <Image className='-mb-12 ml-4' alt="" src={'/assets/study-img.svg'} width="180" height="100" />
            <div className='pt-10 bg-pinkish-purple p-2 rounded-lg text-center'>
                <p className='text-black'>Enhance your study skills with our expert tips and take your learning to the next level</p>
                <button className='rounded-md py-1 mb-2 bg-btn-purple my-4'><Link href="/tips" className='py-1 px-10'>Study Tips</Link></button>
            </div>
            
        </div>
    )
}