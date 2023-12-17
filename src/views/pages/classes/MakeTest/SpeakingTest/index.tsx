import { ActionIcon, Box, Button, Grid, Text } from '@mantine/core';
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconMicrophone,
  IconPlayerPause,
} from '@tabler/icons-react';
import { FC, useState } from 'react';
import BottomBar from '../../components/BottomBar';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import useStyle from './style';
import { useNavigate, useParams } from 'react-router';

export enum SpeakingStep {
  STEP_1 = 'Step1',
  STEP_2 = 'Step2',
}

const SpeakingTest: FC = () => {
  const { classes } = useStyle({}, { name: 'SpeakingTest' });
  const recorderControls = useAudioRecorder();
  const navigate = useNavigate();
  const { test_id } = useParams();

  const [step, setStep] = useState<SpeakingStep>(SpeakingStep.STEP_1);

  const handleRecord = () => {
    recorderControls.stopRecording();
    console.log('test stop record');
  };

  const recordComplte = (blod: any) => {
    console.log('🚀 ~ file: index.tsx:18 ~ recordComplte ~ url:', blod);
  };

  const handleChangePage = (type: 'next' | 'previous') => {
    if (type === 'next') {
      step === SpeakingStep.STEP_1 ? setStep(SpeakingStep.STEP_2) : navigate('');
    } else if (type === 'previous') {
      step === SpeakingStep.STEP_2
        ? setStep(SpeakingStep.STEP_1)
        : navigate(`/classes/make-test/${test_id}/writting-test`);
    }
  };
  return (
    <Grid>
      <Grid.Col span={12} bg="#fff" sx={{ borderRadius: 5 }}>
        <Text ta="center" py={4} fz={18} fw={700}>
          GT Writing Test - Informal Letters
        </Text>
      </Grid.Col>

      <Grid.Col mt={8} span={12} bg="#fff">
        <Text fw={600}>Speaking Part</Text>
        <Grid.Col sx={{ display: 'grid', placeItems: 'center' }} span={12} h="calc(100vh - 330px)">
          {step === SpeakingStep.STEP_1 ? (
            <Box h="100%" w="60%" bg="#F3F3F3">
              <Text c="#C86478" pt={18} tt="uppercase" ta="center" fw={600}>
                Question 2
              </Text>
              <Text fz={14} ta="center" fw={600}>
                What your name?
              </Text>
              <Box className={classes.recordWrap}>
                <AudioRecorder
                  recorderControls={recorderControls}
                  onRecordingComplete={recordComplte}
                />
                <ActionIcon
                  sx={{ width: 100, height: 100, backgroundColor: '#fff', borderRadius: '50%' }}
                  onClick={recorderControls.startRecording}
                >
                  <IconMicrophone size={56} />
                </ActionIcon>

                <Text py={12} fz={18}>
                  {recorderControls.recordingTime}
                </Text>

                <Button color="pink" onClick={handleRecord} rightIcon={<IconPlayerPause />}>
                  Pause
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Text fw={600} fz={14} c="#999" ta="center">
                You should spend about 30 minutes on this test. <br />
                You will meeting and answer an interview with Supervisor
              </Text>
              <Text py={12} fz={14} fw={600} ta="center">
                This test will Begin at Satuday, 27 November 2021, 11:00 AM <br />
                Supervisor: Mr Tho
              </Text>
              <Button>Link to the Meeting</Button>
            </Box>
          )}
        </Grid.Col>
        <Grid.Col
          p={0}
          w="100%"
          mt={14}
          span={12}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Button onClick={() => handleChangePage('previous')} leftIcon={<IconArrowNarrowLeft />}>
            Previous
          </Button>
          <Button onClick={() => handleChangePage('next')} rightIcon={<IconArrowNarrowRight />}>
            Next
          </Button>
        </Grid.Col>
      </Grid.Col>

      <Grid.Col mt={12} span={12} p={0}>
        <BottomBar />
      </Grid.Col>
    </Grid>
  );
};

export default SpeakingTest;
