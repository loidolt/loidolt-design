import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'

import Layout from '../components/layout'
import Seo from '../components/seo'

const useStyles = makeStyles(theme => ({
  media: {
    height: 300,
  },
}))

const websites = [
  'classichomes.com',
  'designstudio.classichomes.com',
  'flyinghorseclub.com',
  'lodgeatflyinghorse.com',
  'flyinghorsesteakhouse.com',
  'flyinghorseranch.com',
  'flyinghorseweddings.com',
  'flyinghorserealty.com',
  'athabascafishing.com',
  'hummingbirdhammocks.com',
  'buyandsellwithkathyl.com',
  'seethalergrowthstrategies.com',
  'klohomedesign.com',
  'themiltoncamp.com',
]

export default function Websites() {
  const classes = useStyles()

  return (
    <Layout>
      <Seo title="Loidolt Design Websites" />
      <h1>Websites</h1>
      <Grid container spacing={2}>
        {websites.map((website, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card>
              <CardActionArea target="_blank" href={'https://' + website}>
                <CardMedia
                  className={classes.media}
                  image={
                    'https://api.miniature.io/?token=KMG4V1Q5NOHqlnKA&width=760&height=500&url=' +
                    website
                  }
                  title={website}
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}
