(function($) {
  $(function() {
    window.hackathonApp = new Vue({
      delimiters: [ '[[', ']]' ],
      el: '#sponsors-app',
      mounted() {
        this.retrieveSponsorPrizes();
      },
      methods: {
        markWinner: function($event, project, prizeIndex) {
          let vm = this;
          const url = '/api/v0.1/hackathon_project/set_winner/';
          const markWinner = fetchData(url, 'POST', {
            project_id: project.pk,
            winner: $event ? 1 : 0
          }, {'X-CSRFToken': vm.csrf});

          vm.prizes[prizeIndex].submissions.forEach((submission, submissionIndex) => {
            if (submission.pk !== project.pk && submission.winner) {
              console.log(submission.pk);
              console.log(project.pk);
              const unmarkPreviousWinner = fetchData(url, 'POST', {
                project_id: submission.pk,
                winner: 0
              }, {'X-CSRFToken': vm.csrf});

              $.when(unmarkPreviousWinner).then(() => {
                vm.$set(vm.prizes[prizeIndex].submissions[submissionIndex], 'winner', false);
              });
            }
          });

          $.when(markWinner).then(response => {
            if (response.message) {
              alert(response.message);
            }
          }).catch(err => {
            console.log(err);
          });
        },
        setNote: function($event, project) {
          let vm = this;

          const url = '/api/v0.1/hackathon_project/set_notes/';
          const setNotes = fetchData(url, 'POST', {
            project_id: project.pk,
            notes: vm.comments[project.pk]
          }, {'X-CSRFToken': vm.csrf});

          $.when(setNotes).then(response => {
            if (response.message) {
              alert(response.message);
            }
          }).catch(err => {
            console.log(err);
          });
        },
        addNote: function(project) {
          let vm = this;

          vm.$set(vm.comments, project.pk, '');
        },
        getComment: function(project) {
          let vm = this;

          return vm.comments[project];
        },
        retrieveSponsorPrizes: function() {
          const vm = this;
          const hackathon = fetchData(`/api/v1/hackathon/${vm.hackathonObj['slug']}/prizes`);

          $.when(hackathon).then((response) => {
            for (let i = 0; i < response.prizes.length; i++) {
              if (response.prizes[i].submissions.length) {
                response.prizes[i].submissions.forEach((submission) => {
                  vm.$set(vm.comments, submission.pk, submission.extra.notes);
                });
              }
            }
            vm.prizes = response.prizes;
          });
        },
        tabChange: function(input) {
          let vm = this;

          switch (input) {
            default:
            case 0:
              newPathName = 'prizes';
              break;
            case 1:
              newPathName = 'submissions';
              break;
          }
          let newUrl = `/hackathon/dashboard/${vm.hackathonObj['slug']}/${newPathName}`;

          history.pushState({}, `${vm.hackathonObj['slug']} - ${newPathName}`, newUrl);

        },
        start_and_end: function(str) {
          if (str.length > 25) {
            return str.substr(0, 8) + '...' + str.substr(str.length - 5, str.length);
          }
          return str;
        },
        getSummary: function(project) {
          if (project.showDescription || project.summary.length < 177) {
            return project.summary;
          }
          return `${project.summary.slice(0, 177)}...`;
        },
        toggleSummary: function(prizeIndex, submissionIndex) {
          let vm = this;
          const showDescription = !vm.prizes[prizeIndex].submissions[submissionIndex].showDescription;
          
          vm.$set(vm.prizes[prizeIndex].submissions[submissionIndex], 'showDescription', showDescription);
        }
      },
      computed: {
        isMobileDevice() {
          return this.windowWidth < 576;
        }
      },
      data: () => ({
        activePanel: document.activePanel,
        hackathonObj: document.hackathonObj,
        hackathonSponsors: document.hackathonSponsors,
        hackathonProjects: [],
        chatURL: document.chatURL,
        prizes: [],
        comments: [],
        csrf: $("input[name='csrfmiddlewaretoken']").val() || ''
      })
    });
  });
})(jQuery);
