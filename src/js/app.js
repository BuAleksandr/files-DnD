import AppSection from './modules/AppSection';
import DnD from './modules/DnD';
import State from './modules/State';

window.onload = () => {
  const todo = new AppSection('todo');
  const inProgress = new AppSection('inprogress');
  const done = new AppSection('done');

  const state = new State();

  const dnd = new DnD();
};
