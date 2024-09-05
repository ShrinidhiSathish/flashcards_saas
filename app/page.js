'use client'

import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Box, AppBar, Button, Container, Toolbar, Typography, Grid, Link } from "@mui/material";
import Head from "next/head";
import { loadStripe } from "@stripe/stripe-js";


export default function Home() {



  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000'
      }
    })
    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }
    // const stripe = await getStripe()

    const stripe = await loadStripe(`${process.env.STRIPE_SECRET_KEY}`, {
      apiVersion: '2022-11-15',
  })
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }
  } 

  

  return (
    <Container maxWidth = "lg"> 
      <Head> 
        <title>Flashcard Saas</title>
        <meta name = "description" content="Create flashcards from your text" />
      </Head>

      <AppBar position = "static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>FLashcard Saas</Typography>
          <SignedOut>
            <Button color="inherit" href="sign-in">Sign In</Button>
            <Button color="inherit" href="sign-up"> Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box
        sx = {{
          textAlign: 'center',
          my: 4,
        }}>
        <Typography variant="h2" gutterBottom>Welcome to Flashcard SaaS </Typography>
        <Typography variant="h5" gutterBottom>
          {' '}
          The easiest way to get flashcards from your text.
        </Typography>
        <Button variant='contained' color='inherit' sx={{mt: 2}}>
            <Link href= "/generate" passHref>
                Get started
            </Link>
        </Button>
      </Box>

      <Box sx = {{my: 6}}>
        <Typography variant="h4" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs = {12} md={4}>
            <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
            <Typography variant="h6" gutterBottom>
              {' '} 
              Simply input your text and our software will do the rest!
              Creating flashcards has never been easier.
            </Typography>
          </Grid>
          <Grid item xs = {12} md={4}>
            <Typography variant="h6" gutterBottom>Smart FLashcards</Typography>
            <Typography variant="h6" gutterBottom>
              {' '} 
              Our AI intelligently breaks down your text into flashcards, perfect for studying!
              </Typography>
          </Grid>
          <Grid item xs = {12} md={4}>
            <Typography variant="h6" gutterBottom>Accessible anywhere</Typography>
            <Typography variant="h6" gutterBottom>
              {' '} 
              Access your flashcards from any device, at any time.
              Study on the go with ease!
              </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="h4" gutterBottom>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs = {12} md={6}>
            <Box sx={{p: 3, border: '1px solid', borderColor: 'grey.300', borderRadius: 2,}}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>$5 / month</Typography>
              <Typography variant="h6">
                {' '} 
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" color="primary" sx = {{mt: 2}}>Choose Basic</Button>
            </Box>
          </Grid>
          <Grid item xs = {12} md={6}>
            <Box sx={{p: 3, border: '1px solid', borderColor: 'grey.300', borderRadius: 2,}}>
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$10 / month</Typography>
              <Typography variant="h6">
                {' '} 
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button variant="contained" color="primary" sx = {{mt: 2}} onClick={handleSubmit}>
                Choose Pro
              </Button>
            </Box>
          </Grid>         
        </Grid>        
      </Box>
    </Container>
  )
}
