"use client";
// React
import React, { useState } from "react";

// Next
import { useRouter } from "next/router";

// Material UI
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

// Helpers
import {
  authButton,
  authInput,
  authSelect,
  authTitle,
  homePageInput,
  titleInputs,
  card
} from "@/helpers/styleConsts";
import { firestore } from "@/helpers/firebase";
import { Publication } from "@/helpers/interface";

// SCSS
import "../app/styles/allStyles.scss";

// UUID
import { v4 as uuidv4 } from "uuid";

// api
import { useMyPublicList } from '@/API/api';



export default function HomePage() {
  const [role, setRole] = useState<string>("");
  const [isSelectHidden, setIsSelectHidden] = useState<boolean>(false);
  const [author, setAuthor] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [commentAuthor, setCommentAuthor] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [piblicDocId, setPublicDocId] = useState<string>('');
  const { publicList, setPublicList, fetchPublicList } = useMyPublicList();

  const router = useRouter();

  const handleRoleChange = (event: SelectChangeEvent<{ value: string }>) => {
    setRole(event.target.value as string);
    setIsSelectHidden(true);
  };

  const addPost = async () => {
    const id = uuidv4();
    const newPost: Publication = {
      id,
      author,
      title,
      text,
      comments: [{}],
    };

    try {
      await firestore.collection("publications").add(newPost);
      setAuthor('');
      setTitle('');
      setText('');
      fetchPublicList();
    } catch (error) {
      console.log("Помилка при додаванні публікації", error);
    }
  };

  const addComment = async (post: Publication, publicId: string) => {
    const id = uuidv4();
    const newComment = {
      id: id,
      author: commentAuthor,
      text: commentText
    };
  
    try {
      const docRef = firestore.collection('publications').doc(publicId);
      const doc = await docRef.get();
  
      if (doc.exists) {
        const updatedComments = [...post.comments, newComment];
        await docRef.update({
          comments: updatedComments
        });
  
        setCommentAuthor('');
        setCommentText('');
  
        fetchPublicList();
      } else {
        console.log('Документ не знайдено');
      }
    } catch (error) {
      console.log('Виникла помилка при додаванні коментаря', error);
    }
  };

  const goToPublicsByName = (name: string) => {
    router.push(`/author/${name}`);
  };
  
  

  return (
    <Box>
      {!isSelectHidden ? (
        <Box>
          <Typography sx={authTitle}>Оберіть Вашу роль!</Typography>
          <Select
            sx={authSelect}
            value={{ value: role }}
            onChange={handleRoleChange}
          >
            <MenuItem value={"author"}>Автор</MenuItem>
            <MenuItem value={"commenter"}>Коментатор</MenuItem>
          </Select>
        </Box>
      ) : null}
      {role === "author" && (
        <>
          <Accordion>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography sx={authTitle}>Створити публікацію</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Box>
                  <Typography sx={titleInputs}>Тема:</Typography>
                  <TextField
                    sx={homePageInput}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                  <Typography sx={titleInputs}>Опис:</Typography>
                  <TextField
                    sx={homePageInput}
                    multiline
                    rows={4}
                    variant="outlined"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                  />
                  <Typography sx={titleInputs}>
                    Введіть нік
                  </Typography>
                  <TextField
                    sx={homePageInput}
                    value={author}
                    onChange={(event) => setAuthor(event.target.value.replace(/\s+/g, ""))}
                  />
                  <Button 
                    sx={authButton} 
                    className="authButton"
                    onClick={addPost}
                  >
                    Опублікувати
                  </Button>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
          {publicList.map((publication: Publication) => (
                <Card key={publication.id} sx={card}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {publication.title}
                  </Typography>
                  <Typography variant="body2">
                    {publication.text}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Typography>Автор:</Typography>
                  <Button 
                    size="small"
                    onClick={() => goToPublicsByName(publication.author)}
                  >
                    {publication.author}
                  </Button>
                </CardActions>
                <Typography>Коментарі:</Typography>
                {Array.isArray(publication?.comments) && publication?.comments?.map((comment) => (
                  <Box key={comment.id}>
                    <Typography sx={{ display: 'inline-block' }}>{comment.author}:</Typography>
                    <Typography sx={{ display: 'inline-block', backgroundColor: 'lightGray', mb: 1.5 }}>{comment.text}</Typography>
                  </Box>
                ))}
              </Card>
          ))}
        </>
      )}

      {role === "commenter" && (
        <Box>
          {publicList.map((publication: Publication) => (
                <Card key={publication.id} sx={card}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {publication.title}
                  </Typography>
                  <Typography variant="body2">
                    {publication.text}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Typography>Автор:</Typography>
                  <Button 
                    size="small"
                    onClick={() => goToPublicsByName(publication.author)}
                  >
                    {publication.author}
                  </Button>
                </CardActions>
                <Typography>Коментарі:</Typography>
                {Array.isArray(publication?.comments) && publication?.comments?.map((comment) => (
                  <Box key={comment.id}>
                    <Typography sx={{ display: 'inline-block' }}>{comment.author}:</Typography>
                    <Typography sx={{ display: 'inline-block', backgroundColor: 'lightGray', mb: 1.5 }}>{comment.text}</Typography>
                  </Box>
                ))}
                <TextField 
                  label="Коментувати" 
                  fullWidth 
                  sx={{ mb: 1.5 }}
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                />
                <TextField 
                  label="Підпис" 
                  size="small"
                  value={commentAuthor}
                  onChange={(event) => setCommentAuthor(event.target.value)} 
                />
                <Button onClick={() => addComment(publication, publication.id)}>
                  Надіслати
                </Button>
              </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
