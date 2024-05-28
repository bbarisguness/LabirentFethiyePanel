import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material ui
import { useTheme, Box, Chip, Grid, Stack, Radio, Button, Switch, Tooltip, Divider, MenuItem, TextField, FormLabel, InputLabel, Typography, RadioGroup, DialogTitle, FormControl, Autocomplete, ListItemText, DialogContent, OutlinedInput, DialogActions, FormHelperText, FormControlLabel, Select } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project imports

import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';

import { ThemeMode, Gender } from 'config';
import { openSnackbar } from 'api/snackbar';
import { insertCustomer, updateCustomer } from 'api/customer';
import { ImagePath, getImageUrl } from 'utils/getImageUrl';

// assets
import { Camera, CloseCircle, Trash } from 'iconsax-react';

const skills = [
  'Adobe XD',
  'After Effect',
  'Angular',
  'Animation',
  'ASP.Net',
  'Bootstrap',
  'C#',
  'CC',
  'Corel Draw',
  'CSS',
  'DIV',
  'Dreamweaver',
  'Figma',
  'Graphics',
  'HTML',
  'Illustrator',
  'J2Ee',
  'Java',
  'Javascript',
  'JQuery',
  'Logo Design',
  'Material UI',
  'Motion',
  'MVC',
  'MySQL',
  'NodeJS',
  'npm',
  'Photoshop',
  'PHP',
  'React',
  'Redux',
  'Reduxjs & tooltit',
  'SASS',
  'SCSS',
  'SQL Server',
  'SVG',
  'UI/UX',
  'User Interface Designing',
  'Wordpress'
];

// CONSTANT
const getInitialValues = () => {
  const newVilla = {
    slug: '',
    name: '',
    room: 0,
    bath: 0,
    person: 0,
    googleMap: '',
    region: '',
    descriptionShort: '',
    descriptionLong: '',
    onlineReservation: false,
    categories: [],
    metaTitle: '',
    metaDescription: '',
    video: ''
  };
  return newVilla;
};

const allStatus = [
  { value: 3, label: 'Rejected' },
  { value: 1, label: 'Verified' },
  { value: 2, label: 'Pending' }
];

// ==============================|| CUSTOMER ADD / EDIT - FORM ||============================== //

export default function FormCustomerAdd({ closeModal }) {
  const theme = useTheme();

  const [loading, setLoading] = useState(true);



  useEffect(() => {
    setLoading(false);
  }, []);

  const VillaSchema = Yup.object().shape({
    name: Yup.string().max(255).required('İsim zorunludur'),
    room: Yup.number().moreThan(0, "Oda sayısı 0'dan büyük olmalıdır").required('Oda Sayısı zorunludur'),
    bath: Yup.number().moreThan(0, "Banyo sayısı 0'dan büyük olmalıdır").required('Banyo Sayısı zorunludur'),
    categories: Yup.array().of(Yup.string()).min(1, 'En az bir adet kategori zorunludur.').required('En az bir adet kategori zorunludur.'),
    person: Yup.number().moreThan(0, "Kişi sayısı 0'dan büyük olmalıdır").required('Kişi Sayısı zorunludur'),
    region: Yup.string().max(255).required('Bölge zorunludur'),
    onlineReservation: Yup.boolean().required('Rezervasyon seçeneği zorunludur')
  });

  // const [openAlert, setOpenAlert] = useState(false);

  // const handleAlertClose = () => {
  //   setOpenAlert(!openAlert);
  //   closeModal();
  // };

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: VillaSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let newCustomer = values;
        newCustomer.name = newCustomer.firstName + ' ' + newCustomer.lastName;

        await insertCustomer(newCustomer).then(() => {
          openSnackbar({
            open: true,
            message: 'Customer added successfully.',
            variant: 'alert',

            alert: {
              color: 'success'
            }
          });
          setSubmitting(false);
          closeModal();
        });

      } catch (error) {
        // console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  if (loading)
    return (
      <Box sx={{ p: 5 }}>
        <Stack direction="row" justifyContent="center">
          <CircularWithPath />
        </Stack>
      </Box>
    );

  return (
    <>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle>{'New Villa'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <InputLabel htmlFor="villa-name">Villa İsmi</InputLabel>
                  <TextField
                    fullWidth
                    id="villa-name"
                    placeholder="Villa İsmi"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="customer-skills">Skills</InputLabel>
                    <Autocomplete
                      multiple
                      fullWidth
                      id="customer-skills"
                      options={skills}
                      {...getFieldProps('skills')}
                      getOptionLabel={(label) => label}
                      onChange={(event, newValue) => {
                        setFieldValue('skills', newValue);
                      }}
                      renderInput={(params) => <TextField {...params} name="skill" placeholder="Add Skills" />}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            {...getTagProps({ index })}
                            variant="combined"
                            key={index}
                            label={option}
                            deleteIcon={<CloseCircle style={{ fontSize: '0.75rem' }} />}
                            sx={{ color: 'text.primary' }}
                          />
                        ))
                      }
                    />
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <InputLabel htmlFor="villa-person">Kişi Sayısı</InputLabel>
                  <TextField
                    fullWidth
                    id="villa-person"
                    placeholder="Kişi Sayısı"
                    {...getFieldProps('person')}
                    error={Boolean(touched.person && errors.person)}
                    helperText={touched.person && errors.person}
                  />
                </Grid>
                <Grid item xs={4}>
                  <InputLabel htmlFor="villa-room">Oda Sayısı</InputLabel>
                  <TextField
                    fullWidth
                    id="villa-room"
                    placeholder="Oda Sayısı"
                    {...getFieldProps('room')}
                    error={Boolean(touched.room && errors.room)}
                    helperText={touched.room && errors.room}
                  />
                </Grid>
                <Grid item xs={4}>
                  <InputLabel htmlFor="villa-bath">Banyo Sayısı</InputLabel>
                  <TextField
                    fullWidth
                    id="villa-bath"
                    placeholder="Banyo Sayısı"
                    {...getFieldProps('bath')}
                    error={Boolean(touched.bath && errors.bath)}
                    helperText={touched.bath && errors.bath}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel htmlFor="villa-region">Bölge</InputLabel>
                  <TextField
                    fullWidth
                    id="villa-region"
                    placeholder="Bölge"
                    {...getFieldProps('region')}
                    error={Boolean(touched.region && errors.region)}
                    helperText={touched.region && errors.region}
                  />
                </Grid>

                <Grid item xs={12}>
                  <InputLabel htmlFor="villa-descriptionShort">Kısa Açıklama</InputLabel>
                  <TextField
                    fullWidth
                    id="villa-descriptionShort"
                    multiline
                    rows={5}
                    placeholder="Kısa Açıklama"
                    {...getFieldProps('descriptionShort')}
                    error={Boolean(touched.descriptionShort && errors.descriptionShort)}
                    helperText={touched.descriptionShort && errors.descriptionShort}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                <InputLabel htmlFor="villa-descriptionLong">Uzun Açıklama</InputLabel>
                <TextField
                  fullWidth
                  id="villa-descriptionLong"
                  multiline
                  rows={5}
                  placeholder="Uzun Açıklama"
                  {...getFieldProps('descriptionLong')}
                  error={Boolean(touched.descriptionLong && errors.descriptionLong)}
                  helperText={touched.descriptionLong && errors.descriptionLong}
                />
              </Grid> */}

                <Grid item xs={6}>
                  <InputLabel htmlFor="villa-metaTitle">Meta Başlık</InputLabel>
                  <TextField
                    fullWidth
                    id="villa-metaTitle"
                    placeholder="Meta Başlık"
                    {...getFieldProps('metaTitle')}
                    error={Boolean(touched.metaTitle && errors.metaTitle)}
                    helperText={touched.metaTitle && errors.metaTitle}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel htmlFor="villa-metaDescription">Meta Açıklama</InputLabel>
                  <TextField
                    fullWidth
                    id="villa-metaDescription"
                    placeholder="Meta Açıklama"
                    {...getFieldProps('metaDescription')}
                    error={Boolean(touched.metaDescription && errors.metaDescription)}
                    helperText={touched.metaDescription && errors.metaDescription}
                  />
                </Grid>
                {/* <Grid item xs={6}>
                <InputLabel id="villa-distance_rulers-label">Mesafeler</InputLabel>
                <FormControl fullWidth>
                  <Select
                    labelId="villa-distance_rulers-label"
                    id="villa-distance_rulers"
                    multiple
                    input={<OutlinedInput placeholder="Tag" />}
                    {...getFieldProps('distance_rulers')}
                    renderValue={(selected: any) => selected.join(', ')}
                  >
                    {distances &&
                      distances?.data.data.map((item: any) => (
                        <MenuItem key={item.id} value={item.attributes.name}>
                          <Checkbox
                            checked={
                              //@ts-ignore
                              values.distance_rulers.indexOf(item?.attributes.name) > -1
                            }
                          />
                          <ListItemText primary={item.attributes.name} />
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid> */}
                {/* <Grid item xs={6}>
                <InputLabel id="villa-features-label">Özellikler</InputLabel>
                <FormControl fullWidth>
                  <Select
                    labelId="villa-features-label"
                    id="villa-features"
                    multiple
                    input={<OutlinedInput placeholder="Tag" />}
                    {...getFieldProps('features')}
                    renderValue={(selected: any) => selected.join(', ')}
                  >
                    {features &&
                      features?.data.data.map((item: any) => (
                        <MenuItem key={item.id} value={item.attributes.name}>
                          <Checkbox
                            checked={
                              //@ts-ignore
                              values.features.indexOf(item?.attributes.name) > -1
                            }
                          />
                          <ListItemText primary={item.attributes.name} />
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid> */}
                <Grid item xs={6}>
                  <InputLabel htmlFor="villa-video">Video</InputLabel>
                  <TextField
                    fullWidth
                    id="villa-video"
                    placeholder="Video"
                    {...getFieldProps('video')}
                    error={Boolean(touched.video && errors.video)}
                    helperText={touched.video && errors.video}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel htmlFor="villa-googleMap">Google Map</InputLabel>
                  <TextField
                    fullWidth
                    id="villa-googleMap"
                    placeholder="Google Map"
                    {...getFieldProps('googleMap')}
                    error={Boolean(touched.googleMap && errors.googleMap)}
                    helperText={touched.googleMap && errors.googleMap}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button color="error" onClick={closeModal}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                      Kaydet
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        </LocalizationProvider>
      </FormikProvider>
    </>
  );
}

FormCustomerAdd.propTypes = { closeModal: PropTypes.func };
