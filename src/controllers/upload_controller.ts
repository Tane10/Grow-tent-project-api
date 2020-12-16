import { Response, Request } from "express";

export default class UploadController {
    public static  async upload(req: Request, res: Response) {
        console.log(req.file)

        res.send(req.file)

    }
}


// <form action="/profile" method="post" enctype="multipart/form-data">
//   <input type="file" name="avatar" />
// </form>