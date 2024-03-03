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

const Loading = ({ isOpen }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Modal
      open={isOpen}
      //   onClose={() => setIsOpen(false)}
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
          width: 300,
          bgcolor: "background.paper",
          border: "1px solid #000",
          borderRadius: "5px",
          p: 4,
        }}
      >
        <Box mb="30px">
          <Typography
            variant="h6"
            color={colors.primary[400]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            Loading...
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default Loading;
