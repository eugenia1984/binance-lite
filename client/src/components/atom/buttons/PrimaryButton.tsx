import { ReactNode } from 'react'
import { Button, ButtonProps } from '@mui/material'
import { colorBtn, sizeBtn, variantBtn } from '../../../utils/types'

interface PrimaryButtonProps extends ButtonProps {
  text: string
  ariaLabelText: string
  variant?: variantBtn
  size?: sizeBtn
  colorBtn?: colorBtn
  icon?: ReactNode
}

/**
 * PrimaryButton is a custom button
 * @prop text: Text to be display in the button
 * @prop ariaLabelText: the aria label of the button
 * @prop variant: by default it's countained, with a background color
 * @prop size: by default it's medium
 * @prop colorBtn: by default it's primary
 * @prop icon: a component that displays an icon
 * 
 * Example to change the color:
 * <PrimaryButton ariaLabelText="boton" text="Button test" sx={{background: 'rgb(234, 236, 239)'}}/>
 */
const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  variant,
  size,
  colorBtn,
  icon,
  ariaLabelText,
  ...props
}) => {
  return (
    <Button
      variant={ variant ? variant : 'contained' }
      size={ size ? size : 'medium' }
      color={ colorBtn ? colorBtn : 'primary' }
      aria-label={ ariaLabelText }
      { ...props }
    >
      { icon } { text }
    </Button>
  )
}

export default PrimaryButton