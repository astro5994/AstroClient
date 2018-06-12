                                        const Discord = require('discord.js');
                                        const client = new Discord.Client();
                                        const hastebin = require('hastebin-gen'); 
                                        const prefix = "/";
                                        client.login("token");

                                    client.on('ready', async ()=> {
                                        console.log('AstroClient Ready!')
                                    })

                                    client.on('message', async message => {
                                        if(message.author.bot) return;
                                                    const args = message.content.slice(prefix.length).trim().split(/ +/g); 
                                                    const command = args.shift().toLowerCase(); 
                                        if(message.content.indexOf(prefix) !== 0) return; 

                                                    if (command === "help") {
    						      if(message.author.id !== client.user.id) return;
                                                      const embed = new Discord.RichEmbed()
                                                      .setAuthor(client.user.username,client.user.avatarURL)
                                                      .setTitle("Help")
                                                      .setDescription("Welcome to AstroClient BETA 1.1\n\nCommands: \n\nhelp - Duh.\neval - Evals JS.\nsetstatus - Sets your game.\nembed - Does an embed.\nhaste - Posts a haste to hastebin.")
                                                      .setColor("8A2BE2")
                                                      .setTimestamp(new Date())
                                                      message.edit({embed:embed});
                                                    }

                                                    if (command === "setstatus") {
    						      if(message.author.id !== client.user.id) return;
                                                      let stsmsg = args.join(" ");
                                                      client.user.setActivity(stsmsg)
                                                    }

                                                    if (command === "embed") {
    						      if(message.author.id !== client.user.id) return;
                                                      let msg = args.join(" ");
                                                      const embed = new Discord.RichEmbed()
                                                      .setTitle(message.author.username)
                                                      .setDescription(msg)
                                                      .setColor("8A2BE2")
                                                      .setThumbnail(client.user.avatarURL)
                                                      .setFooter("Embed by AstroClient BETA 1.1")
                                                      .setTimestamp(new Date())
                                                      message.edit({embed:embed});
                                                    }

						    if (command === "eval") {
    						      if(message.author.id !== client.user.id) return;
  						      try {

                                                        function clean(text) {
 							  if (typeof(text) === "string")
                                                            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                                                          else
                                                            return text;
                                                        }
                                                        const args = message.content.split(" ").slice(1);
						        const code = args.join(" ");
                                                        let evaled = eval(code);
                                                        if (typeof evaled !== "string")
                                                          evaled = require("util").inspect(evaled)
                                                        message.edit(clean(evaled), {code:"xl"});
                                                      } catch (err) {
                                                        message.edit(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
                                                      }
                                                    }

                                                    if (command === "haste") {
    						      if(message.author.id !== client.user.id) return;
                                                      let hastecode = args.join(" ");
						      hastebin(hastecode).then(hasted => {
						          const embed = new Discord.RichEmbed()
                                                          .setAuthor(client.user.username,client.user.avatarURL)
                                                          .setTitle("Haste Uploaded!")
                                                          .setDescription(hasted)
                                                          .setColor("8A2BE2")
                                                          .setTimestamp(new Date())
                                                          message.edit({embed:embed});
						      });
                                                    }


                                    });
