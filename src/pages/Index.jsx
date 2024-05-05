import React, { useState } from "react";
import { Container, VStack, Heading, SimpleGrid, Box, Text, Button, useToast } from "@chakra-ui/react";
import { FaExchangeAlt } from "react-icons/fa";

const Index = () => {
  const [playerOneItems, setPlayerOneItems] = useState(["Sword", "Shield", "Potion"]);
  const [playerTwoItems, setPlayerTwoItems] = useState(["Helmet", "Boots", "Gloves"]);
  const [playerOneOffer, setPlayerOneOffer] = useState([]);
  const [playerTwoOffer, setPlayerTwoOffer] = useState([]);
  const toast = useToast();

  const handleSelectItem = (item, player) => {
    if (player === "playerOne" && !playerOneOffer.includes(item)) {
      setPlayerOneOffer([...playerOneOffer, item]);
    } else if (player === "playerTwo" && !playerTwoOffer.includes(item)) {
      setPlayerTwoOffer([...playerTwoOffer, item]);
    }
  };

  const handleTrade = () => {
    if (playerOneOffer.length === 0 || playerTwoOffer.length === 0) {
      toast({
        title: "Invalid trade",
        description: "Both players need to offer at least one item.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setPlayerOneItems(playerOneItems.filter((item) => !playerOneOffer.includes(item)).concat(playerTwoOffer));
    setPlayerTwoItems(playerTwoItems.filter((item) => !playerTwoOffer.includes(item)).concat(playerOneOffer));
    setPlayerOneOffer([]);
    setPlayerTwoOffer([]);
    toast({
      title: "Trade successful",
      description: "Items have been exchanged.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8}>
        <Heading>Game Item Trading</Heading>
        <SimpleGrid columns={2} spacing={10}>
          <Box>
            <Text fontSize="xl" mb={2}>
              Player One's Items
            </Text>
            {playerOneItems.map((item, index) => (
              <Button key={index} onClick={() => handleSelectItem(item, "playerOne")} m={1}>
                {item}
              </Button>
            ))}
          </Box>
          <Box>
            <Text fontSize="xl" mb={2}>
              Player Two's Items
            </Text>
            {playerTwoItems.map((item, index) => (
              <Button key={index} onClick={() => handleSelectItem(item, "playerTwo")} m={1}>
                {item}
              </Button>
            ))}
          </Box>
        </SimpleGrid>
        <Button leftIcon={<FaExchangeAlt />} colorScheme="blue" onClick={handleTrade}>
          Trade
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
