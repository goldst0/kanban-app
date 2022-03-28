import type { NextPage, GetServerSideProps } from "next";
import React, { ReactElement } from "react";
import Layout from "../components/layout";
import {
  HStack,
  Stack,
  Box,
  Heading,
  Flex,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
  Input,
} from "@chakra-ui/react";
import { DragHandleIcon, AddIcon, CloseIcon } from "@chakra-ui/icons";
import type {
  DropResult,
  DroppableProvided,
  DraggableProvided,
} from "react-beautiful-dnd";
// import { Editable, EditableInput, EditablePreview } from "@chakra-ui/core";
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from "react-beautiful-dnd";

const Test1: any[] = [
  {
    id: "1",
    title: "test",
    tasks: [
      { id: "1", task: "test1" },
      { id: "2", task: "test2" },
      { id: "3", task: "test3" },
    ],
  },
  {
    id: "2",
    title: "bb",
    tasks: [
      { id: "1", task: "ss" },
      { id: "2", task: "ggd" },
      { id: "3", task: "jjj" },
    ],
  },
];

const Home: NextPage = () => {
  const [isBrowser, setIsBrowser] = React.useState(false);

  React.useEffect(() => {
    setIsBrowser(process.browser);
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref: any = React.useRef();
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <HStack justifyContent="center" size="sm" padding="5px">
        <Button {...getSubmitButtonProps()}>カードを追加</Button>
        <CloseIcon
          w="12px"
          h="12px"
          color="gray.600"
          {...getCancelButtonProps()}
        />
      </HStack>
    ) : (
      <HStack
        color="gray.500"
        paddingTop="30px"
        paddingLeft="25px"
        {...getEditButtonProps()}
      >
        <AddIcon w="12px" h="12px" />
        <Text fontSize="14px"> カードを追加</Text>
      </HStack>
    );
  }

  function EditableControls2() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <HStack justifyContent="center" size="sm" padding="5px">
        <Button {...getSubmitButtonProps()}>リストを追加</Button>
        <CloseIcon
          w="12px"
          h="12px"
          color="gray.600"
          {...getCancelButtonProps()}
        />
      </HStack>
    ) : (
      <Box
        w="280px"
        height="45px"
        bgColor="blue.400"
        borderRadius="3px"
        padding="13px"
      >
        <HStack color="white" {...getEditButtonProps()}>
          <AddIcon w="12px" h="12px" />
          <Text fontSize="14px">もう一つリストを追加</Text>
        </HStack>
      </Box>
    );
  }

  const [title, setTitle] = React.useState();
  const [test, setTest] = React.useState(Test1);

  const titleChange = (e: any) => {
    setTitle(e.target.value);
    // Test.forEach((te: any) => {
    //   if (te.id === test.id) {
    //     test.title === e.target.value;
    //   }
    // });
  };

  const titleSubmit = (tes: any) => {
    const a = [...test];
    a[test.findIndex((element: any) => element.id === tes.id)].title = title;

    setTest(a);
    // console.log(a);
  };

  const [newTask, setNewTask] = React.useState();

  const newTaskChange = (e: any) => {
    setNewTask(e.target.value);
  };

  const newTaskSubmit = (tes: any) => {
    console.log(tes.tasks.length);
    const obj = { id: String(tes.tasks.length + 1), task: newTask };
    const a = [...test];
    a[test.findIndex((element: any) => element.id === tes.id)].tasks.push(obj);
    setTest(a);
  };

  const [newTitle, setNewTitle] = React.useState();

  const newTitleChange = (e: any) => {
    setNewTitle(e.target.value);
  };

  const newTitleSubmit = () => {
    const a = { id: String(test.length + 1), title: newTitle, tasks: [] };
    const b = [...test];
    b.push(a);
    console.log(b);
    setTest(b);
  };

  const [editObj, setEditObj] = React.useState<any>({});
  const [editArray, setEditArray] = React.useState();
  const [editTask, setEditTask] = React.useState();

  const editTaskChange = (e: any) => {
    setEditTask(e.target.value);
  };

  const editTaskSubmit = () => {
    const a = [...test];
    const b =
      a[test.findIndex((element: any) => element.id === editArray)].tasks;
    b[b.findIndex((element: any) => element.id === editObj.id)].task = editTask;
    setTest(a);
  };

  const deleteTaskSubmit = () => {
    console.log(editObj.id);
    const a = [...test];
    // const b =
    a[test.findIndex((element: any) => element.id === editArray)].tasks.filter(
      (task: any) => {
        return task.id !== editObj.id;
      }
    );
    console.log(a);
    setTest(a);
  };

  console.log(test);
  console.log(editObj);
  console.log(editArray);

  function handleOnDragEnd(result: DropResult) {
    console.log(result);
    const items = Array.from(test);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTest(items);
    console.log(items);
  }
  function handleOnDragEnd2(result: DropResult, tes: any) {
    console.log(result);
    const items = Array.from(test);
    const [reorderedItem] = items[
      test.findIndex((element: any) => element.id === result.type)
    ].tasks.splice(result.source.index, 1);
    items[
      test.findIndex((element: any) => element.id === result.type)
    ].tasks.splice(result.destination.index, 0, reorderedItem);
    setTest(items);
    console.log(items);
  }
  return (
    <>
      {isBrowser ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="title" type="title">
            {(provided: DroppableProvided) => (
              <Stack
                direction={["column", "row"]}
                spacing="25px"
                padding="35px"
                cursor={"pointer"}
                className="title"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {test.map((tes: any, i: any) => {
                  return (
                    <Draggable key={tes.id} draggableId={tes.id} index={i}>
                      {(provided: DraggableProvided, snapshot) => (
                        <Box
                          w="280px"
                          // height="165px"
                          maxH="100vh"
                          bgColor="gray.200"
                          borderRadius="3px"
                          padding="10px"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Flex color="gray.700">
                            <Heading fontSize="19px">
                              {/*リストのタイトル表示*/}
                              <Editable
                                defaultValue={tes.title}
                                // value={title}
                                cursor={"pointer"}
                                // submitOnBlur={false}
                                onSubmit={(value) => {
                                  titleSubmit(tes);
                                }}
                              >
                                <EditablePreview />
                                <EditableInput
                                  onChange={(e: any) => {
                                    titleChange(e);
                                  }}
                                />
                              </Editable>
                            </Heading>
                            <Spacer />
                            <DragHandleIcon color="gray.500" />
                          </Flex>
                          <DragDropContext onDragEnd={handleOnDragEnd2}>
                            <Droppable droppableId="task" type={tes.id}>
                              {(provided: DroppableProvided) => (
                                <div
                                  className="task"
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                >
                                  {tes.tasks.map((task: any, i: any) => {
                                    return (
                                      <Draggable
                                        key={task.id}
                                        draggableId={task.id}
                                        index={i}
                                      >
                                        {(provided: DraggableProvided) => (
                                          <Box
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            onClick={() => {
                                              onOpen();
                                              // ref.current = { task: task, tes: tes };
                                              setEditObj(task);
                                              setEditArray(tes.id);
                                            }}
                                            bgColor="white"
                                            height="33px"
                                            margin="10px 0px 10px 0px"
                                            padding="3px 10px"
                                            borderRadius="3px"
                                            boxShadow="0px 1px 1px rgba(0, 0, 0, 0.25)"
                                          >
                                            {task.task}
                                          </Box>
                                        )}
                                      </Draggable>
                                    );
                                  })}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </DragDropContext>
                          <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader>Edit</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                <Input
                                  defaultValue={editObj.task}
                                  type="text"
                                  onChange={(e) => editTaskChange(e)}
                                  onSubmit={editTaskSubmit}
                                />
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  colorScheme="blue"
                                  mr={3}
                                  onClick={() => {
                                    deleteTaskSubmit();
                                    onClose();
                                  }}
                                >
                                  delete
                                </Button>
                                <Button
                                  variant="ghost"
                                  onClick={() => {
                                    editTaskSubmit();
                                    onClose();
                                  }}
                                >
                                  Done
                                </Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                          <Editable
                            textAlign="center"
                            defaultValue=""
                            fontSize="2xl"
                            isPreviewFocusable={false}
                            selectAllOnFocus={false}
                            onSubmit={() => newTaskSubmit(tes)}
                          >
                            {/* <EditablePreview /> */}
                            {/* Here is the custom input */}
                            <>
                              <Input
                                as={EditableInput}
                                onChange={(e) => newTaskChange(e)}
                              />
                              <EditableControls />
                            </>
                          </Editable>
                        </Box>
                      )}
                    </Draggable>
                  );
                })}
                {/* <Editable
                  textAlign="center"
                  defaultValue=""
                  fontSize="2xl"
                  isPreviewFocusable={false}
                  onSubmit={() => newTitleSubmit()}
                >
                  <Box bgColor={"white"} borderRadius="3px" w="280px">
                    <Input
                      as={EditableInput}
                      w="90%"
                      marginTop="5px"
                      onChange={(e) => newTitleChange(e)}
                    />
                    <EditableControls2 />
                  </Box>
                </Editable> */}
                {provided.placeholder}
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      ) : null}
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

//   return { props: { data: [] } };
// };

export default Home;
