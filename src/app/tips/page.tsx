import Navigation from "../components/navigation/page";

export default function Tips() {
  return (
<main className="lg:flex min-h-screenp-24 bg-dark-blue-bg">
      <div className="flex-none">
        <Navigation />
      </div>
      <div className="w-full lg:mx-10 lg:px-5 px-10 lg:my-10 py-5">
        <h1 className="text-white text-4xl font-semibold py-5">Welcome to our Study Tips Page!</h1>
        <p>Welcome to our Study Tips Page! We understand that effective studying is crucial for academic success, which is why we've curated a collection of invaluable tips to help you make the most out of your study sessions. Whether you're preparing for exams, tackling assignments, or mastering new concepts, implementing these strategies can enhance your learning experience and boost your performance. From creating a distraction-free environment to practicing self-care, each tip is designed to empower you with the tools and techniques needed to excel in your academic endeavors. Dive in and discover the secrets to efficient and effective studying!</p>
        <div className="grid gap-10 lg:grid-cols-3 mt-10">
          <div>
            <h2 className="text-2xl font-medium">Study Environment Optimization</h2>
            <div className='bg-tips-purple rounded-lg lg:min-h-full mt-7'>
              <ul className="p-5">
                <li className="p-3"><span className="font-semibold">Create a Distraction-Free Zone</span>: Designate a quiet, clutter-free area for studying to minimize interruptions and maximize focus.</li>
                <li className="p-3"><span className="font-semibold">Enhance Lighting and Comfort</span>: Ensure adequate lighting and comfortable seating to reduce eye strain and promote prolonged concentration.</li>
                <li className="p-3"><span className="font-semibold">Organize Study Materials</span>: Keep textbooks, notes, and supplies neatly arranged to streamline your study sessions and avoid unnecessary stress.</li>
              </ul>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-medium">Healthy Habits</h2>
            <div className='bg-tips-purple rounded-lg lg:min-h-full mt-7'>
              <ul className="p-5">
                <li className="p-3"><span className="font-semibold">Use Active Learning Strategies</span>: Engage with the material actively through techniques such as summarization, self-quizzing, and teaching concepts to reinforce understanding.</li>
                <li className="p-3"><span className="font-semibold">Implement the Pomodoro Technique</span>: Break study sessions into intervals of focused work (e.g., 25 minutes) followed by short breaks (e.g., 5 minutes) to maintain productivity and prevent burnout.</li>
                <li className="p-3"><span className="font-semibold">Create Mnemonics and Visual Aids</span>: Develop mnemonic devices or visual diagrams to aid in memory retention and comprehension of complex information.</li>
              </ul>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-medium">Study Environment Optimization</h2>
            <div className='bg-tips-purple rounded-lg lg:min-h-full mt-7'>
              <ul className="p-5">
                <li className="p-3"><span className="font-semibold">Prioritize Sleep and Rest</span>: Aim for adequate sleep each night to support cognitive function, memory consolidation, and overall well-being.</li>
                <li className="p-3"><span className="font-semibold">Maintain a Balanced Diet</span>: Fuel your body and brain with nutritious foods, staying hydrated, and avoiding excessive caffeine or sugary snacks that may lead to energy crashes.</li>
                <li className="p-3"><span className="font-semibold">Incorporate Regular Exercise</span>: Incorporate physical activity into your routine to reduce stress, improve mood, and enhance cognitive performance.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
    </main>
  )
}
