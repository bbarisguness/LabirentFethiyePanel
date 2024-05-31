import useMediaQuery from '@mui/material/useMediaQuery';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

// third-party
import { PatternFormat } from 'react-number-format';

// project-imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

//import defaultImages from 'assets/images/users/default.png';


// assets
import { CallCalling, Gps, Link1, Sms } from 'iconsax-react';
import { GetVilla } from 'services/villaServices';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router';

// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

export default function VillaSummarySection() {
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const params = useParams();

  const [villa, setVilla] = useState();

  useEffect(() => {
    if (params.id > 0)
      GetVilla(params.id).then((res) => setVilla(res.data))
  }, [])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={4} xl={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {villa && (
              <MainCard>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="flex-end">

                    </Stack>
                    <Stack spacing={2.5} alignItems="center">
                      <Avatar alt={villa.attributes.name} size="xxl" src={villa?.attributes?.photos?.data[0]?.attributes?.photo?.data?.attributes?.url} />
                      <Stack spacing={0.5} alignItems="center">
                        <Typography variant="h5">{villa.attributes.name}</Typography>
                        <Typography color="secondary">{villa.attributes.region}</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-around" alignItems="center">
                      <Stack spacing={0.5} alignItems="center">
                        <Typography variant="h5">{villa.attributes.room}</Typography>
                        <Typography color="secondary">Oda</Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack spacing={0.5} alignItems="center">
                        <Typography variant="h5">{villa.attributes.bath}</Typography>
                        <Typography color="secondary">Banyo</Typography>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack spacing={0.5} alignItems="center">
                        <Typography variant="h5">{villa.attributes.person}</Typography>
                        <Typography color="secondary">Kapasite</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <List component="nav" aria-label="main mailbox folders" sx={{ py: 0, '& .MuiListItem-root': { p: 0, py: 1 } }}>
                      <ListItem>
                        <ListItemIcon>
                          <Sms size={18} />
                        </ListItemIcon>
                        <ListItemSecondaryAction>
                          <Typography align="right">Villa Sahibi Adı Soyadı</Typography>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CallCalling size={18} />
                        </ListItemIcon>
                        <ListItemSecondaryAction>
                          <Typography align="right">0532 000 00 00</Typography>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Gps size={18} />
                        </ListItemIcon>
                        <ListItemSecondaryAction>
                          <Typography align="right">Fethiye</Typography>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {/* <ListItem>
                        <ListItemIcon>
                          <Wifi size={18} />
                        </ListItemIcon>
                        <ListItemSecondaryAction>
                          <Typography align="right">{villa.attributes.wifiPassword || '-'}</Typography>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <span>Water Bill</span>
                        </ListItemIcon>
                        <ListItemSecondaryAction>
                          <Typography align="right">{villa.attributes.waterMaterNumber || '-'}</Typography>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <span>Electricity Bill</span>
                        </ListItemIcon>
                        <ListItemSecondaryAction>
                          <Typography align="right">{villa.attributes.electricityMeterNumber || '-'}</Typography>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <span>İnternet Bill</span>
                        </ListItemIcon>
                        <ListItemSecondaryAction>
                          <Typography align="right">{villa.attributes.internetMeterNumber || '-'}</Typography>
                        </ListItemSecondaryAction>
                      </ListItem> */}
                    </List>
                  </Grid>
                </Grid>
              </MainCard>
            )}
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Skills">
              <Grid container spacing={1.25}>
                <Grid item xs={6}>
                  <Typography color="secondary">Junior</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={30} />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="secondary">UX Reseacher</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={80} />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="secondary">Wordpress</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={90} />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="secondary">HTML</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={30} />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="secondary">Graphic Design</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={95} />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="secondary">Code Style</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={75} />
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={7} md={8} xl={9}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard title="About me">
              <Typography color="secondary">
                Hello, I’m Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I create digital Products a
                more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus at.
              </Typography>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Personal Details">
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Full Name</Typography>
                        <Typography>Anshan Handgun</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Father Name</Typography>
                        <Typography>Mr. Deepen Handgun</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Phone</Typography>
                        <Typography>
                          (+1-876) <PatternFormat value={8654239581} displayType="text" type="text" format="#### ### ###" />
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Country</Typography>
                        <Typography>New York</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Email</Typography>
                        <Typography>anshan.dh81@gmail.com</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Zip Code</Typography>
                        <Typography>956 754</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Address</Typography>
                    <Typography>Street 110-B Kalians Bag, Dewan, M.P. New York</Typography>
                  </Stack>
                </ListItem>
              </List>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Education">
              <List sx={{ py: 0 }}>
                <ListItem divider>
                  <Grid container spacing={matchDownMD ? 0.5 : 3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Master Degree (Year)</Typography>
                        <Typography>2014-2017</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Institute</Typography>
                        <Typography>-</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider>
                  <Grid container spacing={matchDownMD ? 0.5 : 3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Bachelor (Year)</Typography>
                        <Typography>2011-2013</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Institute</Typography>
                        <Typography>Imperial College London</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={matchDownMD ? 0.5 : 3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">School (Year)</Typography>
                        <Typography>2009-2011</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Institute</Typography>
                        <Typography>School of London, England</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Emplyment">
              <List sx={{ py: 0 }}>
                <ListItem divider>
                  <Grid container spacing={matchDownMD ? 0.5 : 3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Senior UI/UX designer (Year)</Typography>
                        <Typography>2019-Current</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Job Responsibility</Typography>
                        <Typography>
                          Perform task related to project manager with the 100+ team under my observation. Team management is key role in
                          this company.
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container spacing={matchDownMD ? 0.5 : 3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Trainee cum Project Manager (Year)</Typography>
                        <Typography>2017-2019</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Job Responsibility</Typography>
                        <Typography>Team management is key role in this company.</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
