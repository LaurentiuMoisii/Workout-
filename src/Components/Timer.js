import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Counter from './Counter'
import theme from '../Theme/Theme';

const useStyles = makeStyles({
	test: {
		'& .MuiDrawer-paper': {
			width: '100vw',
			background: theme.palette.primary.orange
		}
	},
	fullList: {
		width: 'auto'
	},
	container: {
		height: '100vh',
  },
  contTimer: {
    margin: '0 auto',
    cursor: 'pointer'
  }
});

export default function TemporaryDrawer(props) {
	const classes = useStyles();

	const list = (anchor) => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom'
			})}
			role="presentation"
			onClick={props.toggleDrawer}
			onKeyDown={props.toggleDrawer}
		>
			<Grid container direction='column' justify='center' alignContent='center' className={classes.container}>
				<Grid item className={classes.contTimer}>
					<Typography variant="h2" gutterBottom>
						STOP
					</Typography>
				</Grid>
				<Grid item className={classes.contTimer}>
          <Counter></Counter>
				</Grid>
			</Grid>
		</div>
	);

	return (
		<div>
			{[ 'top' ].map((anchor) => (
				<React.Fragment key={anchor}>
					<Drawer
						className={classes.test}
						anchor={anchor}
						open={props.state[anchor]}
						onClose={props.toggleDrawer}
					>
						{list(anchor)}
						{props.add}
					</Drawer>
				</React.Fragment>
			))}
		</div>
	);
}
