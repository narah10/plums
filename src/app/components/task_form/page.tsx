"use client";

export default function AddNewTask() {

    return (
                <div id='add-task-container' className="bg-sch-purple p-8 rounded-xl shadow-xl md:max-w-4xl m-auto fixed inset-10 justify-center">
                    <h1 className="text-white text-3xl font-bold text-center">Add New Task</h1>
                    <form>
                        <br></br>
                        <label htmlFor="task-name" className="block mb-2 text-sm font-medium text-gray-900">Task Name</label>
                        <input type="text" placeholder="Task Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        <br></br>
                        <label htmlFor="task-description" className="block mb-2 text-sm font-medium text-gray-900">Task Description</label>
                        <input type="text" placeholder="Task Description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        <br></br>
                        <label htmlFor="task-category" className="block mb-2 text-sm font-medium text-gray-900">Task category</label>
                        <input type="text" placeholder="Task Category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        <br></br>
                        <label htmlFor="task-notes" className="block mb-2 text-sm font-medium text-gray-900">Add Notes</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" multiple />
                        <br></br>
                        <div className="flex justify-around">
                            <label htmlFor="task-images" className="block mb-2 text-sm font-medium text-gray-900">Add Images</label>
                            <label htmlFor="task-attachments" className="block mb-2 text-sm font-medium text-gray-900">Add Attachments</label>
                            <label htmlFor="task-links" className="block mb-2 text-sm font-medium text-gray-900">Add Links</label>
                        </div>
                        <div className="flex">
                            <input type="file" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mx-2" multiple />

                            <input type="file" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mx-2" multiple />

                            <input type="url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mx-2" multiple />
                        </div>
                        <button type="submit" className="w-full text-sch-purple bg-pinkish-purple hover:bg-dark-blue-bg hover:text-white font-medium rounded-lg text-md px-5 py-2.5 my-10 text-center">Add Task</button>
                    </form>
                </div>
    );
}