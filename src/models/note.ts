export default interface Note {
  id: string;
  name: string;
  description: string;
  category: string | null;
  content: string | null;
  images: string[];
  attachments: string[];
  createdAt: string;
  lastEdited: string;
  favorited: boolean; 
  labelIDs: string[];
  parent: string | null;
}

// interface Note {
//   name: string;
//   description: string;
//   lastEdited: string;
//   id: string;
//   favorited : boolean;
// }