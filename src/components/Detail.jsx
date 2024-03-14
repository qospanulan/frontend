import {
  Typography,
  Box,
  useTheme,
  Modal,
  Grid,
  List,
  ListItem,
  Button,
} from "@mui/material";
import { tokens } from "../theme";

const Detail = ({ isOpen, setIsOpen, title, ...props }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box
        m="20px"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "900px",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "1px solid #000",
          borderRadius: "5px",
          p: 4,
        }}
      >
        <Box mb="30px">
          <Typography
            variant="h4"
            color={colors.primary[400]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            {title}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {Object.keys(props).map((key, index) => {
            return (
              <Grid item xs={6} md={4} key={index}>
                <List>
                  <ListItem>
                    <Typography variant="h6" color={colors.greenAccent[100]}>
                      {key}
                    </Typography>
                  </ListItem>
                  {props[key] &&
                    props[key].map((data) => {
                      return (
                        <ListItem width="300px">
                          <Typography
                            variant="h6"
                            color={colors.greenAccent[400]}
                          >
                            {data}
                          </Typography>
                        </ListItem>
                      );
                    })}
                </List>
              </Grid>
            );
          })}
        </Grid>

        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            type="button"
            color="error"
            variant="outlined"
            sx={{ mx: "5px" }}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Detail;
