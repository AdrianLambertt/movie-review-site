import { useState } from "react";
import {
  Box,
  Heading,
  Textarea,
  Button,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { toaster } from "../components/ui/toaster";

// Experimental page (TODO)

export default function ReviewPage() {
  const [review, setReview] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    if (!review.trim()) {
      toaster.create({
        type: "error",
        title: "Review is empty",
        description: "Please write something before submitting.",
        closable: true,
      });
      return;
    }

    toaster.create({
      type: "success",
      title: "Review submitted!",
      description: "Thanks for your feedback.",
      closable: true,
    });

    setReview("");
  };

  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg">
      <Heading mb={4}>Write a Movie Review</Heading>
      <Stack spacing={4}>
        <Textarea
          placeholder="What did you think of the movie?"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleSubmit}>
          Submit Review
        </Button>
      </Stack>
    </Box>
  );
}
