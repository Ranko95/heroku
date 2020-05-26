import { createMuiTheme } from '@material-ui/core/styles';
import { purple, blue } from '@material-ui/core/colors';


const theme = createMuiTheme({
  palette: {
    primery: purple,
    secondary: blue
  },
  status: {
    danger: "orange"
  }

})

export default theme
