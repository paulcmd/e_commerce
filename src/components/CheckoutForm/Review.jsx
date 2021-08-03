import React from 'react'
import { Typography, List, ListItem, ListItemText } from '@material-ui/core'

const Review = ({ checkoutToken }) => {
    return (
        <>
            <Typography variant="h6" gutterBottom></Typography>
            <List disablePadding></List>
            {checkoutToken.live.line_items.map((product, index) => (
                <ListItem style={{ padding: '10px 0' }} key={index}>
                    <ListItemText
                        primary={product.name}
                        secondary={`Quantity : ${product.quantity}`}
                    />
                    <Typography variant="body2">
                        {product.line_total.formatted_with_symbol}
                    </Typography>
                </ListItem>
            ))}
            <ListItem style={{ padding: '10px 0' }}>
                <ListItemText
                    primary={
                        <Typography variant="h6" style={{ fontWeight: 700 }}>
                            Total
                        </Typography>
                    }
                />
                <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                    {checkoutToken.live.subtotal.formatted_with_symbol}
                </Typography>
            </ListItem>
        </>
    )
}

export default Review
