export default interface Note {
  id: string;
  name: string;
  description: string;
  category: string | null;
  content: string | null;
  createdAt: string;
  lastEdited: string;
  favorited: boolean; 
}

// interface Note {
//   name: string;
//   description: string;
//   lastEdited: string;
//   id: string;
//   favorited : boolean;
// }