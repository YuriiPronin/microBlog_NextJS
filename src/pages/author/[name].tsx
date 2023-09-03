// Next
import { useRouter } from 'next/router';

// Materia; UI
import { Box, Card, CardContent, CardActions, Typography, Button  } from "@mui/material";


// Helpers
import { Publication } from '@/helpers/interface';
import { card } from '@/helpers/styleConsts';

// api
import { useMyPublicList } from '@/API/api';

 
export default function AuthorPage() {
  const router = useRouter();
  const { name } = router.query;
  const { publicList } = useMyPublicList();
  const authorList: Publication[] = publicList.filter(post => post.author === name);

  return (
    <Box>
  {authorList ? (
    authorList.map((publication: Publication) => (
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
          >
            {publication.author}
          </Button>
        </CardActions>
        <Typography>Коментарі:</Typography>
        {Array.isArray(publication.comments) && publication.comments.map((comment) => (
          <Box key={comment.id}>
            <Typography sx={{ display: 'inline-block' }}>{comment.author}:</Typography>
            <Typography sx={{ display: 'inline-block', backgroundColor: 'lightGray', mb: 1.5 }}>{comment.text}</Typography>
          </Box>
        ))}
      </Card>
    ))
  ) : (
    <Typography>Список пустий або не існує.</Typography>
  )}
</Box>

  );
};