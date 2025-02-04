import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getAllSeller } from '../service/authService';
import { useNavigate } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface SellerDetails {
  legalName: string;
  logo: string;
  natureOfBusiness: string,
  id: string
}

interface TryDemoDialogProps{
  open : boolean;
  onClose: () => void
}

export default function TryDemoDialog({open, onClose}: TryDemoDialogProps) {


  const [amount, setAmout] = React.useState<string>('')
  const [sellerId, setSellerId] = React.useState<string>('')
  const [sellerDetails, setSellerDetails] = React.useState<SellerDetails[]>([]);

  const fetchAllSellers = async () => {
    try {
      console.log("hitting here")
      const res = await getAllSeller();
      setSellerDetails(res.sellers)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    fetchAllSellers()
  }, [])

  const navigate = useNavigate()

  const handleNavigate = () => {
    const selectedSeller = sellerDetails.find((seller) => seller.id === sellerId);
    const legalName = selectedSeller ? selectedSeller.legalName : '';
  
    navigate(`/discount/gateway?sid=${sellerId}&amount=${amount}&lg=${encodeURIComponent(legalName)}`);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ borderRadius: 24 }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Try Demo
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="input-group">
            <label htmlFor="amount">Enter amount</label>
            <input
              type="text"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmout(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="sellerId">Account Type</label>
            <select
              id="sellerId"
              value={sellerId}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSellerId(e.target.value)}
              required
            >
              <option value="">Choose Brand</option>

              {sellerDetails != undefined && sellerDetails.map((seller) => {
                return (

                  <option key={seller.id} value={seller.id}>{seller.legalName}</option>
                )
              })}
              {/* Add more account types as needed */}
            </select>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleNavigate}>
            Start
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}

