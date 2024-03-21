import Alert from 'react-bootstrap/Alert';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { selectors } from '../slices/lessons';
import { ReactComponent as CopyIcon } from '../assets/copy.svg';

const copyText = (text) => {
  navigator.clipboard.writeText(text)
}

const Schedule = () => {
  const lessons = useSelector(selectors.selectAll);
  const date = new Date();
  console.log(lessons);
  const lessonsToday = lessons.length !== 0 ? lessons.filter((lesson) => {
    const lessonToday = new Date(lesson.lessonDate);
    return lessonToday.getDate() === date.getDate() && lessonToday.getMonth() === date.getMonth();
  }) : [];
  return (
    <div className="container h-100 d-flex flex-column justify-content-between">
      <div className="lessons">
        <h3 className='my-2'>Сегодня</h3>
        {lessonsToday.map((lesson) => {
          // const day = lesson.lessonDate.slice(8, 11);
          const time = lesson.lessonDate.slice(16, 21);
          const lessonClass = cn('bg-light', 'p-2', 'my-2', 'd-flex', 'flex-column', 'border', 'rounded', {
            'border-danger': lesson.passed,
            'border-success': !lesson.passed
          }
          );
          return (
            <div key={lesson.id} className={lessonClass}>
              <span className="my-1"> Имя: {lesson.studentName}</span>
              <span>Время: {time}</span>
            </div>
          );
        })}
      </div>
      <div className="copypasta">
        <h3>Copypasta</h3>
        <Alert className="p-0" variant="light">
          <Button
            variant="light"
            type="button"
            className="border-0 p-3 bg-light w-100"
            onClick={() => copyText('Нагорный Кирилл')}
          >
            <div className="d-flex justify-content-between" >
              <span>Нагорный Кирилл</span>
              <CopyIcon />
            </div>
          </Button>
        </Alert>
        <Alert className="p-0" variant="light">
          <Button
            variant="light"
            type="button"
            className="border-0 p-3 bg-light w-100"
            onClick={() => copyText('nagorniykirill@gmail.com')}
          >
            <div className="d-flex justify-content-between" >
              <span>nagorniykirill@gmail.com</span>
              <CopyIcon />
            </div>
          </Button>
        </Alert>
      </div>
    </div>

  )
}

export default Schedule;