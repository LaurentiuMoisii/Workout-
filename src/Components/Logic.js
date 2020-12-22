import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import Timer from './Timer'

export default function Logic() {
	const useStyles = makeStyles((theme) => ({
		container: {
			margin: '0 auto',
			height: '100vh',
			width: '100%',
			background: theme.palette.background.default
		},
		styleButton: {
			background: theme.palette.primary.orange,
			borderRadius: 100,
			width: 200,
			height: 200,
			fontSize: 100,
			color: theme.palette.primary.white,
			marginTop: 40
		},
		series: {
			display: 'flex',
			flexDirection: 'row',
			width: 300,
			'& p': {
				margin: '0 10px',
				fontSize: '25px'
			}
		},
		total: {
			display: 'flex',
			alignItems: 'center'
		},
		actionButtons: {
			fontSize: 30,
			borderRadius: 100,
			border: '1px solid #000',
			background: theme.palette.primary.white,
			margin: '0 10px'
		},
		toDo: {
			background: theme.palette.primary.white,
			width: '100%',
			borderRadius: 20,
			marginTop: 20
		},
		outer: {
			boxShadow: '2px 2px 25px  #999999',
			padding: 20
		},
		resetButton: {
			margin: '20px 0'
		}
	}))

	const [ add, setAdd ] = useState(0);
	const [ update, setUpdate] = useState([])
	const [ total, setTotal ] = useState(0)
	const [ open,  setOpen] = useState(false)
	const [ resetButton ] = useState(0)
	const [ resetSeries ] = useState([])
	const [state, setState] = useState({
    top: false,
  });

	const incrementCount = () => {
		setAdd(add + 1);
	}

	const decrementCount = () => {
		setAdd(add - 1);
		if (add === 0) {
			setAdd(add);
		}
  }
  
  const updateToSerie = () => {
		update.length < 6 ? setUpdate([...update, add]) : handleClick()
	}

	const addSeries = () => {
		setTotal(update.reduce((a, b) => a + b, 0))
	}

	const handleClick = () => {
    setOpen(true);
	};
	
	const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
	};
	
	const resetActivity = () => {
		setAdd(resetButton)
		setUpdate(resetSeries)
	};

	const toggleDrawer = (anchor, open ) => {
  
    setState({ ...state, [anchor]: open });
  };

	useEffect(() => {
		addSeries()
		//eslint-disable-next-line
	}, [update])
	
	const classes = useStyles();

	return (
		<Grid container direction="column" alignContent="center" justify="center" className={classes.container}>
			<Grid item className={classes.outer} >
				<Grid container>
					<Grid item>
						<Grid container>
							<Grid item xs={9} className={classes.series}>
								{update && update.map((item) => <p>{item}</p>)}
							</Grid>
							<Grid item xs={3} className={classes.total}>
								<Typography variant="h5">Total {total}</Typography>
							</Grid>
						</Grid>
					</Grid>
          <Grid item>
            <Typography variant='h5'></Typography>
          </Grid>
				</Grid>

				<Grid container direction='row' justify='center'>
					<Grid item className={classes.toDo}>
						<Typography variant='h5' align='center' >Now to do:</Typography>
					</Grid>
				</Grid>

				<Grid container justify="center">
					<Grid item>
            <Button 
              className={classes.styleButton} 
							onClick={() => {updateToSerie(); toggleDrawer('top', true)}}
              variant="contained" 
              disableRipple>
							{add}
						</Button>
					</Grid>
				</Grid>

				<Grid container justify="space-between">
					<Grid item>
						<Button onClick={decrementCount} className={classes.actionButtons} variant="contained">
							-
						</Button>
					</Grid>
					<Grid item>
						<Button onClick={incrementCount} className={classes.actionButtons} variant="contained">
							+
						</Button>
					</Grid>
				</Grid>

				<Grid container justify='center'>
					<Grid item>
						<Button 
							variant="contained" 
							disableRipple 
							className={classes.resetButton}
							onClick={() => {resetActivity()}}
							
						>
							RESET ACTIVITY
						</Button>
					</Grid>
				</Grid>
				<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        	<Alert onClose={handleClose} severity="info">
          	You have finished your workout !
       		 </Alert>
      	</Snackbar>
				<Timer
					state={state}
					toggleDrawer={() => toggleDrawer('top', false)}
				>
				</Timer>
			</Grid>
		</Grid>
	);
}
