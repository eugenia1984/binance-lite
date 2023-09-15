import React from 'react'
import { Typography } from '@mui/material'
import { Alignment, HeadlineType } from '../../../utils/types'


interface HeadlineProps {
  text: string
  alignText?: Alignment
  type?: HeadlineType
}

/**
 * HeadlineH1 for H1 tags
 * @prop text: text to be display
 * @prop type: optional, to determinate the tag, by default h1, values:
 * h2, h3, h4, h5, h6
 * @prop alignText: optional, to align the text.By default: left, values: 
 * 'center' | 'inherit' | 'justify' | 'left' | 'right'
 * 
 * Example: <Headline text="Binance" alignText="center" />
 */
const Headline: React.FC<HeadlineProps> = ({
  text,
  alignText,
  type
}) => {
  return (
    <Typography
      component={ type ? type : 'h1' }
      align={ alignText ? alignText : 'left' }
    >
      { text }
    </Typography>
  )
}

export default Headline