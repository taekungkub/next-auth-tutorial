import { Group, Text, Flex, Image, SimpleGrid, ActionIcon, Center, Modal, Box, Paper } from "@mantine/core"
import { IconUpload, IconPhoto, IconX, IconTrash, IconEye } from "@tabler/icons-react"
import { Dropzone, FileRejection, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import useToast from "@/hooks/useToast"
import styles from "./DropImage.module.css"
import { useDisclosure } from "@mantine/hooks"
import { useState } from "react"

interface Props {
  handleSetFileToList: (e: any) => void
  handleDeleteFile: (index: number) => void
  isHasImage: boolean
  images: Array<FileWithPath | String>
}

export default function DropImage({ handleSetFileToList, isHasImage, images, handleDeleteFile }: Props) {
  const toast = useToast()
  const [opened, { open, close }] = useDisclosure(false)

  const [imageModal, setImageModal] = useState("")

  function handleRejectFile(files: FileRejection[]) {
    console.log("reject files", files)
    toast.error({ msg: "Maximum max 5 file or something has error" })
  }

  function handleViewImage(file: String | FileWithPath) {
    let imageUrl = ""
    if (typeof file === "string") imageUrl = file
    else imageUrl = URL.createObjectURL(file as FileWithPath)

    setImageModal(imageUrl)
    open()
  }

  const previews = images.map((file, index) => {
    let imageUrl = ""
    if (typeof file === "string") imageUrl = file
    else imageUrl = URL.createObjectURL(file as FileWithPath)

    return (
      <Paper withBorder p={"xs"} key={index}>
        <Paper bg={"gray.2"} h={"100%"} display={"flex"} style={{ alignItems: "center" }} className={styles.boxWrapper}>
          <div className={styles.overlay}></div>
          <Box className={styles.boxAction}>
            <Center h={"100%"}>
              <Group justify="center">
                <ActionIcon color="teal" size="sm" variant="transparent" onClick={() => handleViewImage(file)}>
                  <IconEye />
                </ActionIcon>
                <ActionIcon color="teal" size="sm" variant="transparent" onClick={() => handleDeleteFile(index)}>
                  <IconTrash />
                </ActionIcon>
              </Group>
            </Center>
          </Box>
          <Box className={styles.innerBox}>
            <Image fit="cover" src={imageUrl} />
          </Box>
        </Paper>
      </Paper>
    )
  })

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={true} centered transitionProps={{ transition: "pop" }}>
        <Image fit="cover" src={imageModal} />
      </Modal>

      <SimpleGrid cols={{ base: isHasImage ? 2 : 1, sm: isHasImage ? 3 : 1, lg: isHasImage ? 3 : 1 }}>
        {previews}

        <Dropzone
          onReject={(files) => handleRejectFile(files)}
          maxSize={3 * 1024 ** 2} //5MB
          accept={IMAGE_MIME_TYPE}
          onDrop={handleSetFileToList}
          maxFiles={5}
        >
          <Paper withBorder p={"xs"} style={{ cursor: "pointer" }}>
            <Group justify="center" style={{ pointerEvents: "none" }} mih={isHasImage ? "5rem" : "15rem"}>
              <Dropzone.Accept>
                <IconUpload size="4.2rem" stroke={1.5} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size="4.2rem" stroke={1.5} />
              </Dropzone.Reject>

              <Dropzone.Idle>
                <IconPhoto size="4.2rem" stroke={1.5} />
              </Dropzone.Idle>

              <Flex direction={"column"} style={{ textAlign: "center" }}>
                <Text>{isHasImage ? "Upload" : "Drag images here or click to select files"}</Text>
                <Text c="dimmed" mt={7}>
                  {isHasImage ? "" : "Attach as many files as you like, each file should not exceed 5mb"}
                </Text>
              </Flex>
            </Group>
          </Paper>
        </Dropzone>
      </SimpleGrid>
    </>
  )
}
