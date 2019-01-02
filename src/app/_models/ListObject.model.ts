export interface ListObjectInterface {
    sectionNumber: number;
    sectionName: string;
    title: string;
    description: string;
    link: string;
  }
  
  export class ListObject implements ListObjectInterface {
    sectionNumber = 0;
    sectionName = '';
    title = '';
    description = '';
    link = '';
  
      constructor(data?: ListObjectInterface) {
          Object.assign(this, data);
      }
  }
  