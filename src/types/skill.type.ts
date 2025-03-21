export interface TSkill {
  _id: string;
  name: string;
  icon: string;
  createdBy: string;
}

export interface TSkillCategory {
  skills: TSkill[];
  category: string;
}
