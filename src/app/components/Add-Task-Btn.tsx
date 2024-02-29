'use client';

import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import AddNewTask from './task_form/page';



export default function AddTaskBtn() {

  let [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
    <button onClick={() => setIsOpen(true)} className="w-full">
        <div id="add-task-btn" className="bg-list-bg hover:bg-tips-purple rounded-lg p-4 shadow-lg mt-4">
            <p className="text-xl font-semibold mb-2">Add New Topic</p>
        </div>
    </button>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-dark-blue-bg bg-opacity-85 " aria-hidden="true" />
            <Dialog.Panel>
                <AddNewTask />
            </Dialog.Panel>
        </Dialog>
    </div>

  )
};