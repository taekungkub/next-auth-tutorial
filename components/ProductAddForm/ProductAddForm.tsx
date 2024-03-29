"use client";
import {
  Button,
  Flex,
  Grid,
  Group,
  TextInput,
  Textarea,
  Box,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { FileWithPath } from "@mantine/dropzone";
import { useEffect, useState } from "react";
import useToast from "@/hooks/useToast";
import DropImage from "@/components/DropImage/DropImage";
import { create2, update2 } from "@/actions/product/create2";
import { useCurrentUser } from "@/hooks/use-current-user";
import { CreateProductSchema } from "@/schemas/product.schema";
import { zodResolver } from "mantine-form-zod-resolver";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  type: "ADD" | "EDIT";
  product?: Product;
}

function FormAddProduct({ type, product }: Props) {
  const toast = useToast();

  const user = useCurrentUser();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      product_title: "",
      description: "",
      price: "",
      stock: "",
      images: [] as Array<File>,
      user_id: user?.id || "",
    },
    validate: zodResolver(CreateProductSchema),
  });

  const [images, setImages] = useState<Array<FileWithPath | String>>(
    form.values.images
  );
  const [isHasImage, setIsHasImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     setImages(form.values.images)
  //     form.setValues(form.values)
  //   }, [inititialForm])

  useEffect(() => {
    form.setValues((prev) => ({ ...prev, images: images as Array<File> }));

    if (images.length === 0) {
      setIsHasImage(false);
    } else {
      setIsHasImage(true);
    }
  }, [images]);

  const getUrlExtension = (url: any) => {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  };

  const onImageEdit = async (image: string, filename: string) => {
    var imgExt = getUrlExtension(image);

    const response = await fetch(image);
    const blob = await response.blob();
    const file = new File([blob], filename + "." + imgExt, {
      type: blob.type,
    });

    return file;
  };

  useEffect(() => {
    if (type === "EDIT") {
      form.setValues({
        product_title: product?.product_title,
        description: product?.description || undefined,
        price: product?.price,
        stock: product?.stock,
      });

      product?.images.map(async (filename) => {
        onImageEdit("/uploads/product/" + filename, filename).then(
          (dataUrl) => {
            setImages((prev) => [...prev, dataUrl]);
          }
        );
      });

      setIsHasImage(true);
    }
  }, [product]);

  async function handleSubmit() {
    try {
      const formData = new FormData();
      setIsLoading(true);

      formData.append("body", JSON.stringify({ ...form.values }));
      if (images) {
        for (const image of form.values.images) {
          formData.append("images", image);
        }
      }

      if (type === "ADD") {
        const data = await create2(formData);
        if (data.success) {
          toast.success({ msg: data.success });
          form.reset();
          setImages([]);
        }
        if (data.error) {
          toast.error({ msg: data.error });
        }
      } else if (type === "EDIT") {
        const data = await update2(Number(product?.id), formData);
        if (data.success) {
          toast.success({ msg: data.success });
        }
        if (data.error) {
          toast.error({ msg: data.error });
        }
        router.back();
        router.refresh();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  function handleSetFileToList(e: Array<FileWithPath | String>) {
    if (form.values.images.length > 5) {
      toast.error({ msg: "Limit image " });
      return;
    }

    if (e.length + form.values.images.length > 5) {
      toast.error({ msg: "Limit image" });

      return;
    }

    setImages((images) => [...images, ...e]);
    setIsHasImage(true);
  }

  function handleDeleteFile(index: number) {
    setImages((images) => images.filter((image, i) => i !== index));
  }

  useEffect(() => {
    if (form.values.images.length >= 1) {
      setIsHasImage(true);
    }
  }, [form.values.images]);

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit())}>
      <Grid>
        <Grid.Col span={{ md: 7 }}>
          <Flex direction={"column"} gap={20} mt={20}>
            <TextInput
              label="Product Title"
              {...form.getInputProps("product_title")}
            />
            <Textarea
              label="description"
              {...form.getInputProps("description")}
            />
          </Flex>

          <Flex direction={"column"} gap={20} mt={20}>
            <Grid>
              <Grid.Col span={{ sm: 6 }}>
                <TextInput
                  label="Price"
                  type="number"
                  {...form.getInputProps("price")}
                />
              </Grid.Col>
              <Grid.Col span={{ sm: 6 }}>
                <TextInput
                  label="Stock"
                  type="number"
                  {...form.getInputProps("stock")}
                />
              </Grid.Col>
            </Grid>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ md: 5 }}>
          <DropImage
            handleSetFileToList={handleSetFileToList}
            isHasImage={isHasImage}
            images={images || []}
            handleDeleteFile={handleDeleteFile}
          />
          <Text fz={"xs"} ta={"center"} c={"red"} mt={"sm"}>
            {form.errors["images"]}
          </Text>
        </Grid.Col>
      </Grid>
      <Box
        py={"lg"}
        bg={"var(--mantine-color-body)"}
        style={{ position: "sticky", bottom: 0 }}
      >
        <Button type="submit" loading={isLoading}>
          {type === "ADD" ? "Submit" : "Save"}
        </Button>
        <Button variant="subtle">Discard</Button>
      </Box>
    </form>
  );
}

export default FormAddProduct;
