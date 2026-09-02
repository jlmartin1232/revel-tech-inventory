import { useState } from 'react'
import {
  AppBar, Box, Button, Container, CssBaseline, Paper, Stack,
  ThemeProvider, Toolbar, Typography, createTheme,
} from '@mui/material'
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#147ce5' },
    background: { default: '#f5f5f7', paper: '#ffffff' },
    text: { primary: '#1d1d1f', secondary: '#6e6e73' },
    divider: '#e5e5e7',
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: { root: { borderRadius: 10, paddingInline: 16 } },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
  },
})

const overviewItems = [
  ['Registered Devices', '0', Inventory2OutlinedIcon],
  ['Average Health', '\u2014', MonitorHeartOutlinedIcon],
  ['Device Categories', '4', CategoryOutlinedIcon],
]

const iconBoxStyles = {
  width: 42,
  height: 42,
  display: 'grid',
  placeItems: 'center',
  color: 'primary.main',
  bgcolor: '#eef6ff',
  borderRadius: 2.5,
  flexShrink: 0,
}

function Header({ currentView, onViewChange }) {
  return (
    <AppBar
      position={'sticky'}
      color={'transparent'}
      elevation={0}
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.94)',
        borderBottom: 1,
        borderColor: 'divider',
        backdropFilter: 'blur(16px)',
      }}
    >
      <Container maxWidth={'lg'}>
        <Toolbar disableGutters sx={{ minHeight: { xs: 68, sm: 76 } }}>
          <Stack direction={'row'} spacing={1.25} sx={{ alignItems: 'center' }}>
            <Box sx={iconBoxStyles}>
              <DevicesRoundedIcon fontSize={'small'} />
            </Box>
            <Box>
              <Typography
                component={'div'}
                sx={{ fontSize: 16, fontWeight: 800, letterSpacing: '0.14em' }}
              >
                REVEL
              </Typography>
              <Typography color={'text.secondary'} sx={{ fontSize: { xs: 11, sm: 12 } }}>
                Tech Gadget Inventory
              </Typography>
            </Box>
          </Stack>
          <Stack direction={'row'} spacing={0.5} sx={{ ml: 'auto' }}>
            {['register', 'registry'].map((view) => (
              <Button
                key={view}
                size={'small'}
                variant={currentView === view ? 'contained' : 'text'}
                disableElevation
                onClick={() => onViewChange(view)}
                aria-pressed={currentView === view}
              >
                {view === 'register' ? 'Register' : 'Registry'}
              </Button>
            ))}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

function OverviewCard({ label, value, Icon }) {
  return (
    <Paper
      variant={'outlined'}
      sx={{
        p: { xs: 2.5, sm: 3 },
        borderColor: 'divider',
        boxShadow: '0 8px 28px rgba(0, 0, 0, 0.035)',
      }}
    >
      <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Typography
            color={'text.secondary'}
            sx={{ fontSize: 14, fontWeight: 600 }}
          >
            {label}
          </Typography>
          <Typography
            component={'p'}
            sx={{ mt: 1.25, fontSize: 34, lineHeight: 1, fontWeight: 650 }}
          >
            {value}
          </Typography>
        </Box>
        <Box sx={iconBoxStyles}>
          <Icon fontSize={'small'} />
        </Box>
      </Stack>
    </Paper>
  )
}

function ViewPanel({ Icon, title, subtitle, placeholder }) {
  return (
    <Paper
      component={'section'}
      variant={'outlined'}
      sx={{
        mt: { xs: 3, sm: 4 },
        p: { xs: 3, sm: 4, md: 5 },
        borderColor: 'divider',
        boxShadow: '0 14px 40px rgba(0, 0, 0, 0.04)',
      }}
    >
      <Stack direction={'row'} spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Box sx={{ ...iconBoxStyles, width: 46, height: 46 }}>
          <Icon />
        </Box>
        <Box>
          <Typography
            component={'h2'}
            sx={{ fontSize: { xs: 23, sm: 27 }, fontWeight: 700 }}
          >
            {title}
          </Typography>
          <Typography color={'text.secondary'} sx={{ mt: 0.5, lineHeight: 1.6 }}>
            {subtitle}
          </Typography>
        </Box>
      </Stack>
      <Box
        sx={{
          mt: 4,
          minHeight: { xs: 170, sm: 210 },
          display: 'grid',
          placeItems: 'center',
          px: 2,
          textAlign: 'center',
          bgcolor: '#fafafa',
          border: '1px dashed',
          borderColor: '#d7d7da',
          borderRadius: 3,
        }}
      >
        <Typography color={'text.secondary'} sx={{ fontSize: 14 }}>
          {placeholder}
        </Typography>
      </Box>
    </Paper>
  )
}

function Introduction() {
  return (
    <Box component={'section'} sx={{ maxWidth: 760 }}>
      <Typography
        color={'primary.main'}
        sx={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.15em' }}
      >
        DEVICE MANAGEMENT
      </Typography>
      <Typography
        component={'h1'}
        sx={{
          mt: 1.5,
          fontSize: { xs: 42, sm: 58, md: 68 },
          lineHeight: 1.04,
          letterSpacing: '-0.045em',
          fontWeight: 700,
        }}
      >
        Technology, organized.
      </Typography>
      <Typography
        color={'text.secondary'}
        sx={{
          mt: 2.5,
          maxWidth: 650,
          fontSize: { xs: 17, sm: 19 },
          lineHeight: 1.65,
        }}
      >
        Register, organize, and review your technology inventory in one simple
        workspace.
      </Typography>
    </Box>
  )
}

function Overview() {
  return (
    <Box
      component={'section'}
      aria-label={'Inventory overview'}
      sx={{
        mt: { xs: 5, sm: 7 },
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(3, minmax(0, 1fr))',
        },
        gap: 2,
      }}
    >
      {overviewItems.map(([label, value, Icon]) => (
        <OverviewCard
          key={label}
          label={label}
          value={value}
          Icon={Icon}
        />
      ))}
    </Box>
  )
}

function App() {
  const [currentView, setCurrentView] = useState('register')

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <Container
        component={'main'}
        maxWidth={'lg'}
        sx={{ py: { xs: 6, sm: 8, md: 10 } }}
      >
        <Introduction />
        <Overview />
        {currentView === 'register' ? (
          <ViewPanel
            Icon={AppRegistrationRoundedIcon}
            title={'Register a Gadget'}
            subtitle={'Add a new device to your REVEL inventory.'}
            placeholder={'Registration form will be added in the next phase.'}
          />
        ) : (
          <ViewPanel
            Icon={Inventory2OutlinedIcon}
            title={'Gadget Registry'}
            subtitle={'View and manage registered technology devices.'}
            placeholder={'Inventory table will be added in the next phase.'}
          />
        )}
      </Container>
    </ThemeProvider>
  )
}

export default App
