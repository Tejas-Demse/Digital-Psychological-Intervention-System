import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mindcare.settings")
django.setup()

from assessments.models import Questionnaire, Question

def seed():
    # Only seed if no questionnaires exist
    if not Questionnaire.objects.filter(title__contains="PHQ-9").exists():
        phq9 = Questionnaire.objects.create(
            title="Patient Health Questionnaire (PHQ-9)",
            description="Over the last 2 weeks, how often have you been bothered by any of the following problems? (0 = Not at all, 1 = Several days, 2 = More than half the days, 3 = Nearly every day)"
        )
        questions = [
            "Little interest or pleasure in doing things",
            "Feeling down, depressed, or hopeless",
            "Trouble falling or staying asleep, or sleeping too much",
            "Feeling tired or having little energy",
            "Poor appetite or overeating",
            "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
            "Trouble concentrating on things, such as reading the newspaper or watching television",
            "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
            "Thoughts that you would be better off dead or of hurting yourself in some way",
        ]
        for index, text in enumerate(questions):
            Question.objects.create(questionnaire=phq9, text=text, order=index + 1)
        print(f"Successfully seeded {phq9.title} with {len(questions)} questions.")

    if not Questionnaire.objects.filter(title__contains="GAD-7").exists():
        gad7 = Questionnaire.objects.create(
            title="Generalized Anxiety Disorder Assessment (GAD-7)",
            description="Over the last 2 weeks, how often have you been bothered by the following problems? (0 = Not at all, 1 = Several days, 2 = More than half the days, 3 = Nearly every day)"
        )
        gad_questions = [
            "Feeling nervous, anxious, or on edge",
            "Not being able to stop or control worrying",
            "Worrying too much about different things",
            "Trouble relaxing",
            "Being so restless that it is hard to sit still",
            "Becoming easily annoyed or irritable",
            "Feeling afraid, as if something awful might happen",
        ]
        for index, text in enumerate(gad_questions):
            Question.objects.create(questionnaire=gad7, text=text, order=index + 1)
        print(f"Successfully seeded {gad7.title} with {len(gad_questions)} questions.")

    if not Questionnaire.objects.filter(title__contains="GHQ-12").exists():
        ghq12 = Questionnaire.objects.create(
            title="General Health Questionnaire (GHQ-12)",
            description="Have you recently... (0 = Better than usual, 1 = Same as usual, 2 = Less than usual, 3 = Much less than usual)"
        )
        ghq_questions = [
            "Been able to concentrate on whatever you're doing?",
            "Lost much sleep over worry?",
            "Felt that you are playing a useful part in things?",
            "Felt capable of making decisions about things?",
            "Felt constantly under strain?",
            "Felt you couldn't overcome your difficulties?",
            "Been able to enjoy your normal day-to-day activities?",
            "Been able to face up to your problems?",
            "Been feeling unhappy and depressed?",
            "Been losing confidence in yourself?",
            "Been thinking of yourself as a worthless person?",
            "Been feeling reasonably happy, all things considered?",
        ]
        for index, text in enumerate(ghq_questions):
            Question.objects.create(questionnaire=ghq12, text=text, order=index + 1)
        print(f"Successfully seeded {ghq12.title} with {len(ghq_questions)} questions.")

if __name__ == '__main__':
    seed()
