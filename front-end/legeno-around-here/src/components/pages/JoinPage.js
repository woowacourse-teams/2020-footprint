import React, {useCallback, useMemo, useState} from 'react';
import {Link} from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {createUser} from '../api/API';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Ittabi 2020.'}
    </Typography>
  );
};

const InputCheck = (input) => {
  return (
    <Grid item xs={12}>
      <Typography variant="caption" color="error">
        {input}
      </Typography>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function JoinForm() {
  const classes = useStyles();
  const NICKNAME_MIN_LENGTH = 1;
  const NICKNAME_MAX_LENGTH = 10;
  const PASSWORD_MIN_LENGTH = 8;
  const PASSWORD_MAX_LENGTH = 16;
  const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const validateEmail = useMemo(() => {
    return email && !EMAIL_REGEX.test(String(email).toLowerCase());
  }, [EMAIL_REGEX, email]);

  const validateNickname = useMemo(() => {
    return (
      nickname &&
      (nickname.length < NICKNAME_MIN_LENGTH ||
        nickname.length > NICKNAME_MAX_LENGTH)
    );
  }, [nickname]);

  const validatePassword = useMemo(() => {
    return (
      password &&
      (password.length < PASSWORD_MIN_LENGTH ||
        password.length > PASSWORD_MAX_LENGTH)
    );
  }, [password]);

  const validatePasswordRepeat = useMemo(() => {
    return (
      passwordRepeat &&
      (passwordRepeat.length === 0 || password !== passwordRepeat)
    );
  }, [password, passwordRepeat]);

  const emailCheck = useMemo(() => {
    if (validateEmail) {
      return InputCheck('올바른 이메일 형식을 입력해주세요.');
    }
  }, [validateEmail]);

  const nicknameCheck = useMemo(() => {
    if (validateNickname) {
      return InputCheck('닉네임 길이는 10 자 이하로 해주세요.');
    }
  }, [validateNickname]);

  const passwordCheck = useMemo(() => {
    if (validatePassword) {
      return InputCheck('비밀번호 길이는 8 ~ 16 자로 해주세요.');
    }
  }, [validatePassword]);

  const passwordRepeatCheck = useMemo(() => {
    if (validatePasswordRepeat) {
      return InputCheck('비밀번호가 일치하지 않습니다.');
    }
  }, [validatePasswordRepeat]);

  const handleChangeEmail = useCallback(({ target: { value } }) => {
    setEmail(value);
  }, []);

  const handleChangeNickname = useCallback(({ target: { value } }) => {
    setNickname(value);
  }, []);

  const handleChangePassword = useCallback(({ target: { value } }) => {
    setPassword(value);
  }, []);

  const handleChangePasswordRepeat = useCallback(({ target: { value } }) => {
    setPasswordRepeat(value);
  }, []);

  const handleReset = useCallback(() => {
    setEmail('');
    setNickname('');
    setPassword('');
    setPasswordRepeat('');
  }, []);

  const join = useCallback(() => {
    createUser(email, nickname, password, handleReset);
  }, [email, nickname, password, handleReset]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (
        validateEmail ||
        validateNickname ||
        validatePassword ||
        validatePasswordRepeat
      ) {
        alert('입력값을 확인해 주세요.');
        return;
      }
      join();
    },
    [
      validateEmail,
      validateNickname,
      validatePassword,
      validatePasswordRepeat,
      join,
    ],
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ThumbUpIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          우리동네캡짱 회원가입
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일"
                name="email"
                autoComplete="email"
                type="email"
                value={email}
                onChange={handleChangeEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" color="error">
                {emailCheck}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="닉네임"
                name="lastName"
                autoComplete="lname"
                type="text"
                value={nickname}
                onChange={handleChangeNickname}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" color="error">
                {nicknameCheck}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="비밀번호"
                id="password"
                autoComplete="current-password"
                type="password"
                value={password}
                onChange={handleChangePassword}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" color="error">
                {passwordCheck}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordRepeat"
                label="비밀번호 확인"
                id="passwordRepeat"
                autoComplete="current-password"
                type="password"
                value={passwordRepeat}
                onChange={handleChangePasswordRepeat}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" color="error">
                {passwordRepeatCheck}
              </Typography>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            회원가입
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                이미 계정이 있으신가요? 로그인을 해주세요!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default JoinForm;
