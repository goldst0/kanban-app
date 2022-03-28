import type { NextPage } from "next";
import {
  Heading,
  HStack,
  Container,
  forwardRef,
  ChakraProps,
  chakra,
  ComponentWithAs,
  Box,
  LinkOverlay,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { motion, MotionProps } from "framer-motion";

export type MotionBoxProps = Omit<ChakraProps, keyof MotionProps> & //Omitはtypescriptが提供するutility typesの一つで、ある型の中から選択した一部を取り除いた新たな型を作成する。（この場合ChakraPropsから選択した一部を取り除いた新たな型を作っている。）
  MotionProps & {
    as?: React.ElementType;
  };

export const MotionBox = motion(
  forwardRef<ChakraProps, "div">((props, ref) => {
    return <chakra.div ref={ref} {...props} />;
  })
) as ComponentWithAs<"div", MotionBoxProps>;

const Header: NextPage = ({ children }) => {
  return (
    <>
      <LinkOverlay href="/" textUnderlineOffset={"unset"}>
        <HStack mt="40px" ml="90px">
          <ChatIcon w={4} h={4} color="cyan.500" />
          <Heading size="sm" color="gray.600">
            Task App
          </Heading>
        </HStack>
      </LinkOverlay>
      {/* <Container h="100vh" d="flex" alignItems="center" justifyContent="center"> */}
      {/* <MotionBox
        as="aside"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 1,
        }}
        padding="2"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        width="12"
        height="12"
        display="flex"
      /> */}
      {/* </Container> */}
      <Container>{children}</Container>
    </>
  );
};

export default Header;
