import { db } from "@/lib/db";
import * as fs from "fs";

import path from "path";

export const uploadImage = async (file: any, doc: any) => {
  if (file.filename != null) {
    var fileExtention = file.filename.split(".").pop();
    doc.image = `${doc.id}.${fileExtention}`;
    var newpath = path.resolve(path.resolve() + "/public/upload/product/") + "/" + doc.image;

    if (fs.existsSync(newpath)) {
      fs.unlinkSync(newpath);
    }

    fs.writeFileSync(newpath, file.data);

    let result = db.product.update({ where: { id: doc.id }, data: { images: doc.image } });

    return result;
  }
};
