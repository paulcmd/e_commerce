import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    
    media: {
        height: 0,
        paddingTop: '63%' // 16:9
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    cartActions: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    buttons: {
        display: 'flex',
        alignItems: 'center'
    }
}))