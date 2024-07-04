export interface IFilesUseCase {
  upload: (res: any, file: Express.Multer.File) => Promise<any>;
}
