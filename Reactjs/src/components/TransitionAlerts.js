import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { AlertTitle } from '@mui/material';

export default function TransitionAlerts(props) {
  const [open, setOpen] = React.useState(props.open);

  return (
    <Box sx={{
         width: '80%',
            justifyItems:'center',
            position:'relative',
            left:'150px',
            // bottom:'50px'
         }}>
      <Collapse in={open}
      sx={{

        justifyItems:'center'

      }}
      >
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >        

              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 ,      justifyContent:"center",
        }}
        ><AlertTitle>        {props.msg}
        </AlertTitle>
      
        </Alert>
      </Collapse> 
    </Box>
  );
}
