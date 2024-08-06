"use client";
import { firestore } from "@/firebase";
import { useRouter,useSearchParams } from 'next/navigation';
import {
  Box,
  Typography,
  Stack,
  TextField,
  Modal,
  Button,
} from "@mui/material";
import {
  collection,
  quantity,
  query,
  setDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { useState, useEffect,useRef } from "react";

function useEffectAllDepsChange(fn, deps) {
  const [changeTarget, setChangeTarget] = useState(deps);

  useEffect(() => {
    setChangeTarget(prev => {
      if (prev.every((dep, i) => dep !== deps[i])) {
        return deps;
      }
      return prev;
    });
  }, [deps]);

  useEffect(fn, changeTarget);
}

export default function Home() {
  const [itemName, setItemName] = useState("");
  const [open, setOpen] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [itemAdded, setItemAdded] = useState(false); 
  const searchParams=useSearchParams();

  const itemAddedRef = useRef(false); 

  useEffectAllDepsChange(() => {
    const tag = searchParams.get('name');

    if (tag && !itemAddedRef.current) {
      addItem(tag);
      itemAddedRef.current = true; // Set the ref value to true after adding the item

      // Update the URL to remove the query parameter
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('name');
      window.history.replaceState({}, '', newUrl);
    }
  }, [searchParams]);

  const router= useRouter();

  const handleCamera=()=>{
    router.push('/cameraimage')
  }

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "materials"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });

    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "materials"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    updateInventory();
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "materials"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);




  return (
    <>
      <Box
        width="100%"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
        margin={0}
        padding={0}
      >
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{ transform: "translate(-50%,-50%)" }}
            position="absolute"
            left="50%"
            top="50%"
            width={400}
            bgcolor="white"
            border="2px solid #000"
            boxShadow={24}
            p={4}
            display="flex"
            flexDirection="column"
            gap={3}
          >
            <Typography variant="h6">Add Items</Typography>
            <Stack width="100%" direction="row" spacing={2}>
              <TextField
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => {
                  setItemName(e.target.value);
                }}
              />
              <Button
                onClick={() => {
                  addItem(itemName);
                  setItemName("");
                  handleClose();
                }}
                variant="outlined"
              >
                Add
              </Button>
              <Button onClick={() => {handleCamera()}} variant="outlined">
                Camera
              </Button>
            </Stack>
          </Box>
        </Modal>

        <Button
          onClick={handleOpen}
          variant="outlined"
          sx={{ color: "#003366", border: "1px solid #003366" }}
        >
          Add New Item
        </Button>
        <Box border="1px solid #003366">
          <Box
            width="90vw"
            height="80px"
            bgcolor="#030234"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5" color="#D3D3D3">
              Inventory Items
            </Typography>
          </Box>

          <Stack
            width="90vw"
            height="300px"
            overflow="auto"
            alignItems="center"
          >
            <Box
              width="100%"
              minHeight="50px"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              borderBottom="1px solid #d3d3d3"
              paddingX={5}
            >
              <Typography
                fontSize="2.5vh"
                color="#333"
                textAlign="center"
                width="30vw"
                fontWeight="bold"
              >
                Name
              </Typography>
              <Typography
                fontSize="2.5vh"
                color="#333"
                textAlign="center"
                width="30vw"
                fontWeight="bold"
              >
                Quantity
              </Typography>
              <Typography width="30vw" 
              textAlign="center"
              fontWeight="bold"
              >
                Action
              </Typography>
            </Box>
            {inventory.map(({ name, quantity }) => (
              <Box
                key={name}
                width="100%"
                minHeight="50px"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                borderBottom="1px solid #d3d3d3"
                paddingX={5}
              >
                <Typography
                  fontSize="2.5vh"
                  color="#333"
                  width="30vw"
                  textAlign="center"
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography
                  fontSize="2.5vh"
                  color="#333"
                  textAlign="center"
                  width="30vw"
                >
                  {quantity}
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  width="30vw"
                  justifyContent="center"
                >
                  <Button onClick={() => addItem(name)} variant="outlined">
                    Add
                  </Button>
                  <Button onClick={() => removeItem(name)} variant="outlined">
                    Remove
                  </Button>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
}
