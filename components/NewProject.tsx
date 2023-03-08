'use client';

import { useState } from 'react';
import Modal from 'react-modal';
import { useRouter } from 'next/navigation';

import { createNewProject } from '@/lib/api';

import Button from './Button';
import Input from './Input';

Modal.setAppElement('#modal');

export default function NewProject() {
  // TODO: right now refetching of data after successful mutation is clunky and not showing any indicator in the UI
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [name, setName] = useState('');

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    await createNewProject(name);
    closeModal();
    router.refresh();
  };

  return (
    <div className="flex items-center justify-center transition-transform duration-200 ease-in-out hover:-translate-y-1.5">
      <Button onClick={() => openModal()}>+ New Project</Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="fixed inset-0 flex items-center justify-center bg-black/40"
        className="w-5/6 max-w-xl rounded-xl bg-white p-8"
      >
        <h1 className="mb-6 text-3xl">New Project</h1>
        <form className="flex items-center gap-x-4" onSubmit={handleSubmit}>
          <Input
            placeholder="project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit">Create</Button>
        </form>
      </Modal>
    </div>
  );
}
