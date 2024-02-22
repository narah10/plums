export default function Recents(){
  return(
    <section className=" bg-gray text-black rounded-lg p-5 m-5 lg:w-1/2 md:w-3/4 w-full">
        <h1 className="text-2xl">Recents</h1>
        <div className="flex flex-col m-3">
          <ul className="[&>*:nth-child(odd)]:bg-slate-200">
            <li className="m-2 flex justify-between py-1 px-3">Task 1<span className="text-slate-400">03/18/2023</span></li>
            <li className="m-2 flex justify-between py-1 px-3">Task 2<span className="text-slate-400">03/18/2023</span></li>
            <li className="m-2 flex justify-between py-1 px-3">Task 3<span className="text-slate-400">03/18/2023</span></li>
          </ul>
        </div>
    </section>
  )
}
