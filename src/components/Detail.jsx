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

const Detail = ({ isOpen, setIsOpen, title, data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        m="20px"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
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
          <Grid item xs={12} md={6}>
            <List>
              {data &&
                data.map((number_info) => {
                  return (
                    <ListItem>
                      <Typography variant="h6" color={colors.greenAccent[400]}>
                        {number_info.number}
                      </Typography>
                    </ListItem>
                  );
                })}
            </List>
          </Grid>
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
