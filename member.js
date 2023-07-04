function skillsMember()
{
    var member = document.getElementById("member").value;
    var skills = document.getElementById("skills").value;
    var member = member.split(",");
    var skills = skills.split(",");
    var memberSkills = [];
    for (var i = 0; i < member.length; i++)
    {
        memberSkills.push(member[i] + " " + skills[i]);
    }
    document.getElementById("memberSkills").innerHTML = memberSkills;
}
